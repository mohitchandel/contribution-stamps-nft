"use client";
import React from "react";
import AppLayout from "./components/Layouts/AppLayout";
import { Card, Col, Row, Typography } from "antd";
import WagmiWrapper from "./components/wagmiWrapper";

const { Meta } = Card;

const { Title, Text } = Typography;

export default function Home() {
  return (
    <WagmiWrapper>
      <AppLayout>
        <>
          <Row justify="center" style={{ marginBottom: "16px" }}>
            <Col span={17}>
              <Title>Welcome to the Stamp Minting Platform</Title>
              <Text>
                Mint your unique stamps by proving your GitHub repositories in
                the languages of JavaScript, Solidity, and Rust. Showcase your
                coding skills and accomplishments by connecting your GitHub
                account and verifying your repositories. Once verified, you can
                mint stamps that represent your proficiency in each language.
                Share your stamps with others, celebrate your achievements, and
                inspire fellow developers. Start minting today and build your
                collection of prestigious stamps!
              </Text>
            </Col>
          </Row>
          <Row justify="center">
            <Col span={6}>
              <Card
                style={{ margin: "0 12px" }}
                cover={
                  <img
                    alt="example"
                    src="https://bafkreia2g6ttdnliyhm2rh5igc7tpyhk7gvyczewvft6mzl7nwwx55vrmi.ipfs.nftstorage.link"
                  />
                }
              >
                <Meta
                  title="JS Stamp"
                  description="Prove Your JavaScript Skills"
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card
                style={{ margin: "0 12px" }}
                cover={
                  <img
                    alt="example"
                    src="https://bafkreicecr7vavjjmonvwbopgxnhofpg5q7tzi5jskkocxcmjnzkoyflce.ipfs.nftstorage.link"
                  />
                }
              >
                <Meta
                  title="Solidity Stamp"
                  description="Prove Your solidity Skills"
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card
                style={{ margin: "0 12px" }}
                cover={
                  <img
                    alt="example"
                    src="https://bafkreifhtwjree5kyduhlfqs7p6v6tzskp3hz3cxw3u6iwdz6t66kvfwom.ipfs.nftstorage.link/"
                  />
                }
              >
                <Meta title="Rust Stamp" description="Prove Your Rust Skills" />{" "}
              </Card>
            </Col>
          </Row>
        </>
      </AppLayout>
    </WagmiWrapper>
  );
}
