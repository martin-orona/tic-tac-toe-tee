export function getAvatarTitle(url: string) {
  return (url.split("/").pop() as string)
    .replace(/(\w+?)(\d+).*/g, "$1 $2")
    .replace(/.+/g, word => word.charAt(0).toUpperCase() + word.slice(1));
}
