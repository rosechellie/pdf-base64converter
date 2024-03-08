
export function isPDF(file) {
  try {
    var filename = file.name
    if (filename.substring(filename.length - 4).toUpperCase() === ".PDF") {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
}