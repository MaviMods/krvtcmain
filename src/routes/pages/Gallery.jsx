import { TITLE } from "../../helpers/configs";
import { useDarkMode } from "../../hooks/contex/DarkModeContex";

const Gallery = () => {
  document.title = TITLE + " | Gallery";
  const { themeTatailwind } = useDarkMode();
  const data = [
    {
      imageLink:
        "https://i.postimg.cc/L4Jmvdsx/ets2-20240120-194357-00.png",
    },
    {
      imageLink:
        "https://i.postimg.cc/nzkp5ZDW/ets2-20240813-164252-00.png",
    },
    {
      imageLink:
        "https://i.postimg.cc/8kZTmpDJ/20240615211515-1.jpg",
    },
    {
      imageLink:
        "https://i.postimg.cc/VLT12KJz/20240615215717-1.jpg",
    },
    {
      imageLink:
        "https://i.postimg.cc/R01B69X0/20240615224102-1.jpg",
    },
    {
      imageLink:
        "https://i.postimg.cc/prrb6jx9/ets2-20240211-195511-00.png",
    },
    {
      imageLink:
        "https://i.postimg.cc/52V1x6Sr/ets2-20240114-224303-00.png",
    },
    {
      imageLink:
        "https://i.postimg.cc/q7BT3SYX/ets2-20240113-230019-00.png",
    },
    {
      imageLink:
        "https://i.postimg.cc/HsG12VRL/ets2-20240107-214705-00.png",
    },
  ];
 
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {data.map(({ imageLink }, index) => (
        <div key={index}>
          <img
            className="h-50 w-auto rounded-lg"
            src={imageLink}
            alt="gallery-photo"
          />
        </div>
      ))}
    </div>
  );
}
export default Gallery;
