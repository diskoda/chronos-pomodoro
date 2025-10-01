// Static imports for all question images
import question2Img from '../assets/images/question2_img.png';
import question2ImgFromQuestionImages from '../assets/images/questionImages/question2_img.png';

// Image mapping for dynamic loading
export const questionImages: Record<string, string> = {
  'question2_img.png': question2Img,
  'questionImages/question2_img.png': question2ImgFromQuestionImages,
};

// Function to get image URL by name
export const getQuestionImage = (imageName: string): string | null => {
  // Try exact match first
  if (questionImages[imageName]) {
    return questionImages[imageName];
  }
  
  // Try without path prefix
  const fileName = imageName.split('/').pop();
  if (fileName && questionImages[fileName]) {
    return questionImages[fileName];
  }
  
  console.warn(`Image not found: ${imageName}`);
  return null;
};