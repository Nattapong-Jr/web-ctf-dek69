import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      sys_id: "UNKNOWN_HOST",
      payload_sequence: [
        { ping_status: ".-" },
        { mem_addr_1: "0x0E19" },
        { rot_val_1: "U >> 5" },
        { bit_mask_1: "0b111000011000" },
        { hex_dump_1: "0x4F" },
        { dec_offset_1: 3633 },
        { file_perm_1: "0124" },
        { mem_addr_2: "0x0E28" },
        { rot_val_2: "Q >> 3" },
        { word_block_1: "0x0E1E0E4C" },
        { bit_mask_2: "0b01010100" },
        { ascii_raw_1: 71 },
        { bit_mask_3: "0b111000000111" },
        { rot_val_3: "E >> 4" },
        { mem_addr_3: "0x0E17" },
        { ping_status_2: "-." },
      ],
      system_note: "Archive lookup required. Check Git commit history for decryption protocol at https://github.com/Nattapong-Jr/ctf-dek69.git",
    },
    { status: 200 }
  );
}
