import { Fragment } from "react";
import { Avatar, Card, Group, Stack, Title, Text, rem } from "@mantine/core";
import { IconFileDelta } from "@tabler/icons-react";

import FileUpload from "@/components/clients/FileUpload";
import { getProfileByIdApi } from "@/lib/supabase/profiles";
import { getListOfFilesApi } from "@/lib/supabase/files";
import FileStructure from "@/components/common/Tree";
import ClientFiles from "@/components/clients/ClientFiles";

const UserDetail = async ({ params }: { params: { clientId: string } }) => {
  const user = await getProfileByIdApi(params.clientId);
  const files = await getListOfFilesApi(user.email)

  return (
    <Fragment>
      <Card withBorder mb={12}>
        <Group justify="">
          <Stack align="center" gap={0} px={30} py={10}>
            <Avatar size="xl" m={10} color="primary" />
            <Title order={2} mb={12} lh={0} mt={20}>
              {user.first_name} {user.last_name}
            </Title>
            <Text size="sm">{user.email}</Text>
          </Stack>
          <Card bg={"gray.1"}>
            <Group gap={0} px={5}>
              <IconFileDelta
                style={{ width: rem(50), height: rem(50) }}
                stroke={1.5}
                color="var(--mantine-color-primary-9)"
              />
              <Stack gap={0} ms={12} ps={20} style={{ borderLeft: "1px solid var(--app-shell-border-color)" }}>
                <Title style={{ fontSize: rem(40) }}>{files.length}</Title>
                <Text size="xs">Total Files</Text>
              </Stack>
            </Group>
          </Card>
        </Group>
      </Card>
      <ClientFiles user={user} />
      <FileUpload user={user} />
    </Fragment>
  );
};

export default UserDetail;
