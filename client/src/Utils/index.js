import { surpriseMePrompts } from "../Constants";
import FileSaver from "file-saver";
// This function will give random prompt each time we click suprise me button.
export function getRandomPrompt(prompt) {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt = surpriseMePrompts[randomIndex];

  //This check will verify if the same propmt is repeating itself two or three times in a row.
  if (randomPrompt === prompt) return getRandomPrompt(prompt);

  return randomPrompt;
}

// This function will help a use to download the image by clicking on the download button using file-saver library.
export async function downloadImage(_id, photo) {
  FileSaver.saveAs(photo, `download-${_id}.jpg`);
}
