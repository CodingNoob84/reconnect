// src/server/upload-avatar.ts
import { createServerFn } from "@tanstack/react-start";
import { getSupabaseServerClient } from "#/db/init";

export const uploadAvatar = createServerFn({
  method: "POST",
})
.inputValidator(
    (data: {
      file: string;
      userId: string;
    }) => data
  )
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient();

    const buffer = Buffer.from(data.file, "base64");

    const filePath = `${data.userId}.webp`;

    const { error } = await supabase.storage
      .from("avatars")
      .upload(filePath, buffer, {
        upsert: true,
        contentType: "image/webp",
      });

    if (error) {
      throw error;
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    return {
      url: publicUrl,
    };
  });