import { Stack } from "expo-router";
import { useFonts} from "expo-font";

import * as Splashscreen from "expo-splash-screen";
import { useEffect } from "react";

Splashscreen.preventAutoHideAsync();

export default function RootLayout() {

  const [loaded, error] = useFonts({
    //font variable
    "merriweather": require("../assets/fonts/Merriweather-VariableFont_opsz,wdth,wght.ttf"),
    "oswald": require("../assets/fonts/Oswald-VariableFont_wght.ttf"),
    "raleway": require("../assets/fonts/Raleway-VariableFont_wght.ttf"),
    "roboto": require("../assets/fonts/RobotoMono-VariableFont_wght.ttf"),
    "tiktoksans": require("../assets/fonts/TikTokSans-VariableFont_opsz,slnt,wdth,wght.ttf"),

    //font statis
    "ubuntu": require("../assets/fonts/Ubuntu-Italic.ttf"),
    "barlowCondensed": require("../assets/fonts/BarlowCondensed-Regular.ttf"),
    "ptsans": require("../assets/fonts/PTSans-Regular.ttf"),
    "rubik": require("../assets/fonts/Rubik-Regular.ttf"),
    "tilitium": require("../assets/fonts/TitilliumWeb-Regular.ttf")
  })

  useEffect(()=>{
    if(loaded||error){
      Splashscreen.hideAsync();
    }
  }, [loaded, error]
)
if(!loaded && error){
  return null
}
  return <Stack />;
}
