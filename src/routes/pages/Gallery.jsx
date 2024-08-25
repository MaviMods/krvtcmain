import { TITLE } from "../../helpers/configs";
import { useDarkMode } from "../../hooks/contex/DarkModeContex";

const Gallery = () => {
  document.title = TITLE + " | Gallery";
  const { themeTatailwind } = useDarkMode();
  const data = [
    {
      imageLink:
        "https://i.postimg.cc/vBdZk3S4/ets2-20240815-113359-00.png",
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
        "https://media.discordapp.net/attachments/1138825132098465884/1251789182716608555/ets2_20240615_224327_00.png?ex=66cad286&is=66c98106&hm=fd2560fba9c805699acd9bd765a859f2efdcbb9b1377c231eba562fd29182ce6&",
    },
    {
      imageLink:
        "https://media.discordapp.net/attachments/1138825132098465884/1251587727816790126/20240615212731_1.jpg?ex=66cb6867&is=66ca16e7&hm=c8a77131bd523795b0ce140172c10465304e69e5d03e51d46467da718d620745&",
    },
    {
      imageLink:
        "https://media.discordapp.net/attachments/1138825132098465884/1251587648125145128/20240615224102_1.jpg?ex=66cb6854&is=66ca16d4&hm=733d1310e6a5e0c02b40ba9d12d875f09f1cfc201a1cd48227e48089c6445ddb&",
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
