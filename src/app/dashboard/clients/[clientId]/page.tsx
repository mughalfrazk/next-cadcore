import { Fragment } from "react";
import { Avatar, Card, Group, Stack, Title, Text, rem } from "@mantine/core";
import { IconFile3d } from "@tabler/icons-react";

import FileUpload from "@/components/clients/FileUpload";
import { getProfileByIdApi } from "@/lib/supabase/profiles";
import { getListOfFilesApi } from "@/lib/supabase/files";
import ClientFiles from "@/components/clients/ClientFiles";

const UserDetail = async ({ params }: { params: { clientId: string } }) => {
  const user = await getProfileByIdApi(params.clientId);
  const files = await getListOfFilesApi(user.email);

  return (
    <Fragment>
      <Card withBorder mb={12}>
        <Group justify="space-between">
          <Group justify="center">
            <Avatar size="xl" m={10} color="primary" />
            <Stack align="flex-start" gap={0}>
              <Title order={2}>
                {user.first_name} {user.last_name}
              </Title>
              <Text size="sm">{user.email}</Text>
            </Stack>
          </Group>
          <Card bg={"gray.1"}>
            <Group gap={0} px={5}>
              <IconFile3d
                style={{ width: rem(50), height: rem(50) }}
                stroke={1.3}
                color="var(--mantine-color-primary-9)"
              />
              <Stack
                gap={0}
                ms={12}
                ps={20}
                style={{
                  borderLeft: "1px solid var(--app-shell-border-color)",
                }}
              >
                <Title style={{ fontSize: rem(40) }}>{files.length}</Title>
                <Text size="xs">Total Files</Text>
              </Stack>
            </Group>
          </Card>
        </Group>
      </Card>
      <ClientFiles files={files} />
      <FileUpload user={user} />
    </Fragment>
  );
};

export default UserDetail;
