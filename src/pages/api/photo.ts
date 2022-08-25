// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { URL } from "url";
import { z } from "zod";
import { env } from "../../env/server.mjs";

const LIMIT_PER_PAGE = 12;

const flickerResponseSchema = z.object({
  photos: z.object({
    page: z.number(),
    pages: z.number(),
    photo: z.array(
      z.object({
        id: z.string(),
        url_w: z.string().optional(),
      })
    ),
  }),
});

export type PhotosErorr = {
  error: string;
};
export type PhotosResponse = z.infer<typeof flickerResponseSchema>;
type APIResponse = PhotosResponse | PhotosErorr;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse>
) {
  const { tags, page_number = 1 } = req.query;
  if (!tags || Array.isArray(tags)) {
    res.status(400).json({ error: "Missing search query" });
    return;
  }

  try {
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${
      env.FLICKER_API_KEY
    }&tags=${tags
      .split(" ")
      .join(
        ","
      )}&safe_search=1&per_page=${LIMIT_PER_PAGE}&page=${page_number}&media=photos&extras=url_w&format=json&nojsoncallback=1`;
    const resp = await fetch(url).then((res) => res.json());
    console.log(resp.photos.photo);
    const result = flickerResponseSchema.parse(resp);
    console.log({ resp, url });
    res.status(200).setHeader("cache-control", "max-age=120").json(result);
  } catch (err) {
    res.status(500).json({ error: "something went wrong" });
  }
}
