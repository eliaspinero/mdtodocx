import { unified } from "unified";
import markdown from "remark-parse";
import docx from "remark-docx";

const fetchImage = async (url) => {
  const image = new Image();
  const res = await fetch(url);
  const buf = await res.arrayBuffer();
  return new Promise((resolve, reject) => {
    image.onload = () => {
      resolve({
        image: buf,
        width: image.naturalWidth,
        height: image.naturalHeight
      });
    };
    image.onerror = reject;
    image.src = URL.createObjectURL(new Blob([buf], { type: "image/png" }));
  });
};

const processor = unified()
  .use(markdown)
  .use(docx, { output: "blob", imageResolver: fetchImage });

async function md2docx(md) {
  const doc = await processor.process(md);
  const blob = await doc.result;
  return blob;
}

export default md2docx;
