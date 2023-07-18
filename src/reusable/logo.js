import React from "react";
import Image from "next/image";
import { Grid } from "@mui/material";

export default function Logo() {
  return (
    <Grid container direction='column' alignItems='center'>
      {/* logo */}
      <Grid item>
        <Image src='/dev/logo-monogramme.webp' width={46} height={63} />
      </Grid>
      {/* logo */}
      <Grid item sx={{ mt: "10px" }}>
        <Image src='/dev/logo-texte.webp' width={296} height={62} />
      </Grid>
    </Grid>
  );
}
