import { TITLE } from "../../helpers/configs";
import { useDarkMode } from "../../hooks/contex/DarkModeContex";

const Gallery = () => {
  document.title = TITLE + " | Gallery";
  const { themeTatailwind } = useDarkMode();
  const data = [
    {
      imageLink:
        "https://media.discordapp.net/attachments/1138825132098465884/1267056153913724989/ets2_20240727_223850_00.png?ex=66cafdff&is=66c9ac7f&hm=6ed9ea52364264ef92f758d79131dbc26ccc2e96b2f468587be37296c10829c0&",
    },
    {
      imageLink:
        "https://media.discordapp.net/attachments/1138825132098465884/1267056153339367477/ets2_20240727_223821_00.png?ex=66cafdff&is=66c9ac7f&hm=20b49b37b02c086d1f6a047b2e9095101d002cc1d852c14c1dad401e9b9202cf&",
    },
    {
      imageLink:
        "https://media.discordapp.net/attachments/1138825132098465884/1266827216696639509/ets2_20240727_200559_00.png?ex=66cad188&is=66c98008&hm=a7434ffd0b3e30aeecf076092902e7bb5f7e91df7aa45f218573dfb0618bddc3&",
    },
    {
      imageLink:
        "https://media.discordapp.net/attachments/1138825132098465884/1266827217925570581/ets2_20240727_200630_00.png?ex=66cad189&is=66c98009&hm=717b17afffa47c3ca2e9e85f73da33c76b0fb769f7a250d13f954dc42f2d5092&",
    },
    {
      imageLink:
        "https://media.discordapp.net/attachments/1138825132098465884/1261717988654972938/ets2_20240713_191433_00.png?ex=66cb58f2&is=66ca0772&hm=c131ce523d1b19f90e4602b4021d2b63f88589a6a42f7800a2dd702e07c01bb7&",
    },
    {
      imageLink:
        "https://media.discordapp.net/attachments/1138825132098465884/1251587750579273799/20240615211515_1.jpg?ex=66cb686d&is=66ca16ed&hm=9255e0b8a30daaeb6368fef933efe331e4a231bd64186a6de9a222695796c6d9&",
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
