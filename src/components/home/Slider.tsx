import { conthraxFont } from "@/styles/fonts";
import classes from "./Slider.module.css";
import { Box, rem, Text } from "@mantine/core";

const Slider = () => {
  return (
    <Box
      ta={"center"}
      className={`${conthraxFont.className} ${classes.sliderBg}`}
      pt={200}
    >
      <Text c="var(--mantine-color-white)" style={{ fontSize: rem(30) }}>
        Architecture should speak of its time and place,
      </Text>
      <Text
        style={{ fontSize: rem(45) }}
        c="var(--mantine-color-primary-9)"
      >
        But yearn for timelessness
      </Text>
      <Text ta={"right"} c="var(--mantine-color-white)">
        - Frank Gehry
      </Text>
    </Box>
  );
};

export default Slider;
