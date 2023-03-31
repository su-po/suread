import { writeFile } from "node:node:fs"
import cheerio from "npm:cheerio@latest"
export function removeDataAttributes(html: string) {
  const $ = cheerio.load(html)
  return $.html()
}

// const url = "https://paco.me/writing/hook-getter";
const url = "https://monoskop.org/log/?p=23486"

export function stripIdsAndClasses(html: string) {
  const $ = cheerio.load(html)
  $("[id]").removeAttr("id")
  $("[class]").removeAttr("class")
  $("*").removeAttr("style")
  // Remove every data attribute
  $("script").remove()
  $("head").remove()
  return $.html()
}
∏
export function removeInteractive(html: string) {
  const $ = cheerio.load(html)
  $("button").remove()
  $("input").remove()
  $("select").remove()
  $("label").remove()
  $("fieldset").remove()
  $("legend").remove()
  $("textarea").remove()
  // TODO: Allow Audio + Video
  $("audio").remove()

  $("video").remove()
  $("textarea").remove()
  $("iframe").remove()
  $("canvas").remove()
  $("object").remove()
  $("drag").remove()
  $("drop").remove()
  $("slot").remove()
  $("shadow").remove()
  $("template").remove()
  $("menuitem").remove()
  $("menu").remove()
  $("meter").remove()
  $("progress").remove()
  $("datalist").remove()
  $("embed").remove()
  $("img").remove()
  $("svg").remove()
  $("header").remove()
  $("nav").remove()
  $("form").remove()
  return $.html()
}

export async function fetchHtml(url: string) {
  try {
    const res = await fetch(url)
    const html = await res.text()

    return html
  } catch (e) {
    console.log("ERROR: " + e)
  }
}
export function removeAllAttributes(html: string) {
  const $ = cheerio.load(html)
  $("*").each(function() {
    $(this).removeAttr("*")
  })
  return $.html()
}

export function removeNonHTTPLinks(html: string) {
  const $ = cheerio.load(html)
  $("a[href]").each((_i: number, el: string) => {
    const href = $(el).attr("href")

    if (href && !href.startsWith("http")) {
      $(el).remove()
    }
  })
  return $.html()
}

export async function getCleanHtml(url: string) {
  try {
    const html = await fetchHtml(url)
    if (html) {
      const cleanedHtml = stripIdsAndClasses(html)
      return removeAllAttributes(cleanedHtml)
    }
  } catch (e) {
    console.log(e)
  }
}

// export const strippedHtml = await getCleanHtml(url)

}


export function packHTML(html: string) {
  const $ = cheerio.load(html, {
    normalizeWhitespace: true,
    xmlMode: true,
    decodeEntities: true,
  })

  $('*').contents().filter((_i: number, el: { nodeType: number; data: string }) => {
    return el.nodeType === 8 || (el.nodeType === 3 && /^(\s*<!--|\/\/|-->|\n\s*)/.test(el.data))
  }).remove()

  return $.html()
}

if (strippedHtml) {
  const removedAttributes = removeDataAttributes(strippedHtml)
  const removedInteractive = removeInteractive(removedAttributes)
  const filteredHTTP = removeNonHTTPLinks(removedInteractive)
  const packedHTML = packHTML(filteredHTTP)

  const encoder = new TextEncoder()
  const htmlBuffer = encoder.encode(packedHTML)
  writeFile("test.html", htmlBuffer, err => {
    console.log(err)
  })
  
export function returnHTML(url: string) {
  const strippedHtml = await getCleanHtml(url)
  if (strippedHtml) {
  const removedAttributes = removeDataAttributes(strippedHtml)
  const removedInteractive = removeInteractive(removedAttributes)
  const filteredHTTP = removeNonHTTPLinks(removedInteractive)
  const packedHTML = packHTML(filteredHTTP)

  const encoder = new TextEncoder()
  const htmlBuffer = encoder.encode(packedHTML)
  // writeFile("test.html", htmlBuffer, err => {
  //   console.log(err)
  // })
  
  return htmlBuffer
  
}