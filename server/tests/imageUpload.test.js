const fs = require("fs");
const { imagesPath } = require("../utils/imageUtils");
const { addFileToCollector, readImage } = require("../controllers/imageController");

describe("Testing image-collector", () => {
  it("should return timeout id", () => {
    const timeout = addFileToCollector("test.jpg", 10000);
    expect(timeout["_destroyed"]).toEqual(false);
    clearTimeout(timeout)
    expect(timeout["_destroyed"]).toEqual(true);
  });
  it("should remove image", async () => {
    const imageName = 'cyolo.png'
    fs.copyFileSync("../cyolo.png", `${imagesPath}/${imageName}`)
    const timeoutId = addFileToCollector(imageName, 100);
    await new Promise((resolve) => setTimeout(resolve, 200));
    expect(fs.existsSync(`${imagesPath}/${imageName}`)).toBe(false);
  });
})

const imageName = 'cyolo.png'
const cyoloImage = fs.readFileSync(`../${imageName}`);
describe("Testing get-image", () => {
  it("should match image", async () => {
    fs.copyFileSync(`../${imageName}`, `${imagesPath}/${imageName}`)
    const image = readImage(imageName);
    expect(image).toEqual(cyoloImage);
    fs.unlinkSync(`${imagesPath}/${imageName}`);
  });

  it("should throw if no picture found", async () => {
    expect(() => {
      readImage(imageName)
    }).toThrow();
  })
})