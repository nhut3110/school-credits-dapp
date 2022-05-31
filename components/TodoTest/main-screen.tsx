import React, { useCallback, useState } from "react";
import { Icon, VStack, useColorModeValue, Fab, Box } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import AnimatedColorBox from "./animated-color-box";
import TaskList from "./task-list";
import Masthead from "./masthead";
import "react-native-get-random-values";
import { nanoid } from "nanoid";
import ThemeToggle from "./theme-toggle";

const initialData = [
  {
    id: nanoid(10),
    subject: "Eat my friend's chick next week",
    done: false,
  },
  {
    id: nanoid(10),
    subject: "Kill a gay on Monday",
    done: false,
  },
];

export default function MainScreen() {
  const [data, setData] = useState(initialData);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  const handleToggleTaskItem = useCallback((item) => {
    setData((prevData) => {
      const newData = [...prevData];
      const index = prevData.indexOf(item);
      newData[index] = {
        ...item,
        done: !item.done,
      };
      return newData;
    });
  }, []);
  const handleChangeTaskItemSubject = useCallback((item, newSubject) => {
    setData((prevData) => {
      const newData = [...prevData];
      const index = prevData.indexOf(item);
      newData[index] = {
        ...item,
        subject: newSubject,
      };
      return newData;
    });
  }, []);
  const handleFinishEditingTaskItem = useCallback((_item) => {
    setEditingItemId(null);
  }, []);
  const handlePressTaskItemLabel = useCallback((item) => {
    setEditingItemId(item.id);
  }, []);
  const handleRemoveItem = useCallback((item) => {
    setData((prevData) => {
      const newData = prevData.filter((i) => i !== item);
      return newData;
    });
  }, []);

  return (
    <AnimatedColorBox
      flex={1}
      bg={useColorModeValue("warmGray.50", "primary.900")}
      w="full"
    >
      {/* <Box bg="purple.500"></Box> */}
      <Masthead title="" image={require("./assets/ganyu.jpg")}>
        {/* <NavBar /> */}
      </Masthead>

      <VStack
        flex={1}
        space={1}
        bg={useColorModeValue("warmGray.50", "primary.900")}
        mt="-20px"
        borderTopLeftRadius="20px"
        borderTopRightRadius="20px"
        pt="20px"
      >
        <TaskList
          data={data}
          onToggleItem={handleToggleTaskItem}
          onChangeSubject={handleChangeTaskItemSubject}
          onFinishEditing={handleFinishEditingTaskItem}
          onPressLabel={handlePressTaskItemLabel}
          onRemoveItem={handleRemoveItem}
          editingItemId={editingItemId}
        />
      </VStack>
      <Fab
        position="absolute"
        renderInPortal={false}
        size="sm"
        icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />}
        colorScheme={useColorModeValue("blue", "darkBlue")}
        bg={useColorModeValue("blue.500", "blue.400")}
        onPress={() => {
          const id = nanoid(10);
          setData([
            {
              id,
              subject: "",
              done: false,
            },
            ...data,
          ]);
          setEditingItemId(id);
        }}
      />
      <ThemeToggle />
    </AnimatedColorBox>
  );
}
