"use client";

import { Fragment, useEffect } from "react";
import { Avatar, Card, Group, Stack, Title, rem, Text } from "@mantine/core";
import { IconFile3d } from "@tabler/icons-react";

import ProjectList from "@/components/project/ProjectList";
import { useClientContext } from "@/context/client-context";
import { ProfileModel } from "@/lib/models/Profile";
import { useProfileContext } from "@/context/profile-context";

const ClientPage = ({ client }: { client: ProfileModel }) => {
  const { me } = useProfileContext();
  const { setClient } = useClientContext();

  useEffect(() => {
    setClient(client);
  }, [client]);

  return (
    <Fragment>
      {me?.profile.role.name !== "client" && (
        <Card withBorder mb={12}>
          <Group justify="space-between">
            <Group justify="center">
              <Avatar size="xl" m={10} color="primary" />
              <Stack align="flex-start" gap={0}>
                <Title order={2}>
                  {client?.first_name} {client?.last_name}
                </Title>
                <Text size="sm">{client?.email}</Text>
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
                  <Title style={{ fontSize: rem(40) }}>0</Title>
                  <Text size="xs">Total Files</Text>
                </Stack>
              </Group>
            </Card>
          </Group>
        </Card>
      )}
      <ProjectList client={client} />
    </Fragment>
  );
};

export default ClientPage;
