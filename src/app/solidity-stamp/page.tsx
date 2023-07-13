"use client";
import React, { useState } from "react";
import {
  Card,
  Col,
  Row,
  Typography,
  Input,
  Button,
  message,
  Spin,
  Alert,
} from "antd";
import { toBigInt } from "ethers";
import { Stamp__factory } from "../../../typechain-types";
import AppLayout from "../components/Layouts/AppLayout";
import axios from "axios";
import { prepareWriteContract, writeContract } from "@wagmi/core";
import WagmiWrapper from "../components/wagmiWrapper";
import { useAccount, useNetwork } from "wagmi";
import {
  CONTRACT_ADDRESS,
  customMessages,
  languagesIndexes,
  mintDataType,
} from "../utils/stampUtils";
import { NoticeType } from "antd/es/message/interface";
import { polygonMumbai } from "wagmi/chains";

const { Meta } = Card;

const { Title, Text } = Typography;

const Context = React.createContext({ name: "Default" });

function StampFunc() {
  const [githubUsername, setGithubUsername] = useState<string>();
  const [messageApi, contextHolder] = message.useMessage();
  const [mintData, setMintData] = useState<mintDataType>({
    contributed: false,
    repos: toBigInt(0),
    username: "",
  });
  const [canMint, setCanMint] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [trxHash, setTrxHash] = useState<string | undefined>();
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();

  const openMessage = (message: string, type: NoticeType) => {
    messageApi.open({
      type,
      content: message,
    });
  };

  function checkEligibility() {
    if (!githubUsername || githubUsername == "") {
      openMessage(customMessages.EMPTY_USERNAME, "error");
      return;
    }
    setIsLoading(true);
    axios
      .get(`https://api.github.com/users/${githubUsername}/repos`)
      .then(function (response) {
        let repoCount = 0;
        const repositories = response.data;
        repositories.forEach(function (repo: { language: string }) {
          if (repo.language === "Solidity") {
            repoCount++;
          }
        });
        repoCount > 0
          ? setMintData({
              contributed: true,
              repos: toBigInt(repoCount),
              username: githubUsername,
            })
          : setMintData({
              contributed: false,
              repos: toBigInt(repoCount),
              username: githubUsername,
            });
        setCanMint(repoCount > 0);
        if (!(repoCount > 0)) {
          openMessage(customMessages.UNABLE_TO_MINT, "error");
        }
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  }

  const mintStamp = async () => {
    if (chain?.id != polygonMumbai.id) {
      openMessage(customMessages.WRONG_CHAIN, "error");
      return;
    }
    if (!isConnected && address) {
      openMessage(customMessages.WALLET_NOT_CONNECT, "error");
      return;
    }

    const config = await prepareWriteContract({
      address: CONTRACT_ADDRESS,
      abi: Stamp__factory.abi,
      functionName: "safeMint",
      args: [
        "https://bafkreif3w7bb4hlm2ammlbmkrwbafan4o2kcove4blo4zdsf7llgu3af2a.ipfs.nftstorage.link/",
        mintData,
        languagesIndexes.Solidity,
      ],
    });
    const { hash } = await writeContract(config);
    !hash
      ? openMessage(customMessages.MINT_ERROR, "error")
      : openMessage(customMessages.MINT_SUCCESS, "success");

    setTrxHash(hash);
  };

  return (
    <AppLayout>
      <>
        {contextHolder}
        <Row justify="center" gutter={[16, 16]}>
          <Col span={10}>
            {trxHash ? (
              <Alert
                message="Badge Minted"
                description={
                  <p>
                    <a href={`https://mumbai.polygonscan.com/tx/${trxHash}`}>
                      Click here
                    </a>{" "}
                    to verify transaction
                  </p>
                }
                type="success"
              />
            ) : (
              ""
            )}
            <Title level={2}>Solidity Stamp</Title>
            <Text>
              Mint a unique Solidity stamp by providing details about your
              GitHub repository showcasing your Solidity projects. Fill in the
              form below to create your stamp.(NOTE: You can only mint 1 stamp
              per wallet)
            </Text>
            <div>
              <Input
                onChange={(e) => setGithubUsername(e.target.value)}
                placeholder="Enter Your GitHub Username"
              />
              {canMint ? (
                <Button onClick={() => mintStamp()}>Mint Stamp</Button>
              ) : (
                <Button disabled={isLoading} onClick={() => checkEligibility()}>
                  {isLoading ? <Spin /> : "Check"}
                </Button>
              )}
            </div>
          </Col>
          <Col span={10}>
            <Card
              style={{ margin: "0 12px" }}
              cover={
                <img
                  alt="solidity-stamp"
                  src="https://bafkreicecr7vavjjmonvwbopgxnhofpg5q7tzi5jskkocxcmjnzkoyflce.ipfs.nftstorage.link"
                />
              }
            >
              <Meta title="Solidity Stamp" />
            </Card>
          </Col>
        </Row>
      </>
    </AppLayout>
  );
}

export default function SolidityStamp() {
  return (
    <WagmiWrapper>
      <StampFunc />
    </WagmiWrapper>
  );
}
