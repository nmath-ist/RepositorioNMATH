
import express from 'express';
import { Storage } from 'megajs';

export default async function get_data_from_mega(path) {

let correct_path = 'Repositório LMAC e MMAC/'

for (const place of path){
    correct_path = correct_path + place + '/'
}



  try {
    const storage = await new Storage({
      email:'novorepositorionmath@gmail.com',
      password: 'nMathrepositorio22!',
    }).ready;

    const file = await storage.navigate(correct_path);
    
    if (file.directory){
          for (const [name, node] of Object.children(file)) {
  ({
        name: node.name,
        type: node.directory ? 'folder' : 'file',
        nodeId: node.nodeId
      });
    }
    }else{
      return ({
        name: file.name,
        type: file.directory ? 'folder' : 'file',
        nodeId: file.nodeId,
        link : file.link,
      });
    }

    await storage.close();
  } catch (err) {
    console.error('Error:', err);
  };
}