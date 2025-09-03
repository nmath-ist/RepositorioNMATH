import express from 'express';
import cors from 'cors';
import { Storage } from 'megajs';
import get_data_from_mega from './modules/get_data_from_mega.js';

const PORT = 5000;
const app = express();
app.use(cors());

let isReady = false;

const storage = await new Storage({
    email: process.env.MEGA_EMAIL || '',
    password: process.env.MEGA_PASSWORD || '',
})

function findNodeByPath(path) {
  const parts = path.split("/").filter(Boolean);
  let current = storage.root;

  for (const part of parts) {
    current = Object.values(current.children).find(c => c.name === part);
    if (!current) return null;
  }
  return current;
}


storage.on("ready", () => {
  console.log("Connected to MEGA");
  isReady = true;



// Quando o cliente pede os ficheiros de uma pasta
app.get("/list", async (req, res) => {
  if (!isReady) return res.status(503).send("Storage not ready yet");
  const folderPath = req.query.path || "";
  const folder = findNodeByPath(folderPath) || storage.root;
  console.log("Requested path:", folderPath);
  try {
      
      if (!folder) return res.status(404).send("Folder not found");
      if (!folder.directory) return res.status(400).send("Path is not a folder");
      if (folder.directory){
        const items = Object.values(folder.children).map(c => ({
          name: c.name,
          type: c.directory ? "folder" : "file",
          nodeId: c.nodeId,
          path: '',
        }));
      res.json(items);
      }
  
      
      app.get("/download", (req, res) => {
      const filePath = req.query.path;
      if (!filePath) return res.status(400).send("Missing path parameter");

      const file = findNodeByPath(filePath);
      if (!file) return res.status(404).send("File not found");

      res.setHeader("Content-Disposition", `inline; filename="${file.name}"`);
      res.setHeader("Content-Type", "application/octet-stream");

      console.log(`Streaming ${filePath}...`);
      file.download().pipe(res);
      });
      
    } catch (err) {
    console.error("Error in /list:", err);
    res.status(500).json({ error: err.message });
  }
});

    //Quando o Cliente procura um determinado ficheiro ou Pasta
    app.get("/search", async (req, res) => {

    //Esta função permite obter o caminho completo de um determinado nó a partir do objeto
        function getPath(object){
          let node = object;
          let path = node.name;
          while(node.parent.name !== 'Repositório LMAC e MMAC' ){
            path = node.parent.name + '/' + path;
            node = node.parent;
          }
          return path;
        }


      const query = (req.query.q || "").toLowerCase();
      if (!query) return res.json([]);

      const results = storage.filter(e => e.name.toLowerCase().includes(query), true)

      function getPathNameIdType(object){
        return(
          {
            name: object.name,
            type: object.directory ? "folder" : "file",
            nodeId: object.nodeId,
            path: getPath(object),
          }
        )
      }

    res.json(results.map(e => getPathNameIdType(e)));
      });




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

});