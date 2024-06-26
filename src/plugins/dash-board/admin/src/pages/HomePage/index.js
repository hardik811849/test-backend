/*
 *
 * HomePage
 *
 */

import React, { useEffect, useState } from "react";
// import PropTypes from 'prop-types';
import pluginId from "../../pluginId";
import "./Homepage.css";
import {
  Box,
  Flex,
  Typography,
  TextInput,
  Button,
  Icon,
  Grid,
  GridItem,
  Select,
  Option,
  Card,
  CardBody,
  CardTitle,
} from "@strapi/design-system";
import {
  Search,
  User,
  Auction,
  CheckCircle,
  Home,
  Message,
  House,
  Equalizer,
} from "@strapi/icons";
import { ethers } from "ethers";
import axios from "axios";
import { io } from "socket.io-client";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";

const HomePage = () => {
  // const navigate = useNavigate();

  // const handleCreateTokenClick = () => {
  //   navigate("/create-token");
  // };

  const history = useHistory();

  const [totalProperty, setTotalProperty] = useState(0);
  const [erc1404Supply, setErc1404Supply] = useState(0);
  const [erc3643Supply, setErc3643Supply] = useState(0);
  const [erc7518Supply, setErc7518Supply] = useState(0);
  const [totalHolders, setTotalHolders] = useState(0);
  const [totalCirculation, setTotalCirculation] = useState(0);
  const [ethereumPrice, setEthereumPrice] = useState(null);

  const connectToMetaMask = async () => {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const accounts = await provider.listAccounts();
      const network = await provider.getNetwork();
      const chainId = network.chainId;

      const usdaoAddress = "0x37eE79A302B0c99544Dd01E94370A0B9d0D36d80";

      const TOKENABI = [
        {
          constant: true,
          inputs: [{ name: "_addr", type: "address" }],
          name: "balanceOf",
          outputs: [{ name: "", type: "uint256" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: false,
          inputs: [
            { name: "_spender", type: "address" },
            { name: "_value", type: "uint256" },
          ],
          name: "approve",
          outputs: [{ name: "", type: "bool" }],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: true,
          inputs: [
            { name: "_owner", type: "address" },
            { name: "_spender", type: "address" },
          ],
          name: "allowance",
          outputs: [{ name: "", type: "uint256" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: false,
          inputs: [
            { name: "_from", type: "address" },
            { name: "_to", type: "address" },
            { name: "_value", type: "uint256" },
          ],
          name: "transferFrom",
          outputs: [{ name: "", type: "bool" }],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "totalSupply",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "decimals",
          outputs: [
            {
              internalType: "uint8",
              name: "",
              type: "uint8",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ];

      const usdaoContract = new ethers.Contract(
        usdaoAddress,
        TOKENABI,
        provider
      );

      // console.log(usdaoContract);
      const decimal = await usdaoContract.decimals();
      const erc1404TotalSupply = await usdaoContract.totalSupply();
      setErc1404Supply(
        ethers.utils.formatUnits(erc1404TotalSupply, Number(decimal))
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const ws = new WebSocket("wss://stream.binance.com:9443/ws/ethusdt@trade");

    ws.onmessage = (event) => {
      const eventData = JSON.parse(event.data);
      const price = parseFloat(eventData.p).toFixed(2);
      setEthereumPrice(price);
    };
  }, []);

  useEffect(() => {
    connectToMetaMask();
  }, []);

  return (
    <>
      <Box padding={4}>
        {/* Input Group */}
        <Flex paddingBottom={6} justifyContent="space-between">
          <TextInput
            name="search"
            placeholder="Country, State, City, Postal Code"
            aria-label="Search"
            endAction={
              <Button variant="ghost" icon={<Search />}>
                <Icon as={Search} />
              </Button>
            }
          />
          <Select
            placeholder="Select option"
            name="dropdown"
            className="dropdown"
          >
            <Option value="all">All</Option>
            <Option value="ETH">ETH</Option>
            <Option value="Metic">Polygon</Option>
            <Option value="binance">Binance</Option>
          </Select>
        </Flex>

        {/* Overview Section */}
        <Typography variant="beta" as="h2" paddingBottom={4}>
          Overview
        </Typography>
        <Grid gap={4}>
          <GridItem col={3} s={12} padding={2}>
            <Box
              padding={4}
              shadow="tableShadow"
              background="neutral0"
              hasRadius
            >
              <Flex alignItems="center" gap={3}>
                <Icon
                  as={House}
                  color="primary600"
                  width="30px"
                  height="30px"
                />
                <Flex
                  direction="column"
                  alignItems="flex-start"
                  paddingLeft={2}
                >
                  <Box>Total Property</Box>
                  <Box fontWeight="bold" fontSize="2rem">
                    0
                  </Box>
                </Flex>
              </Flex>
            </Box>
          </GridItem>
          <GridItem col={3} s={12} padding={2}>
            <Box
              padding={4}
              shadow="tableShadow"
              background="neutral0"
              hasRadius
            >
              <Flex alignItems="center" gap={3}>
                <Icon
                  as={House}
                  color="primary600"
                  width="30px"
                  height="30px"
                />
                <Flex
                  direction="column"
                  alignItems="flex-start"
                  paddingLeft={2}
                >
                  <Box>Current Price</Box>
                  <Box fontWeight="bold" fontSize="2rem">
                    {`${ethereumPrice} ETH`}
                  </Box>
                </Flex>
              </Flex>
            </Box>
          </GridItem>
          <GridItem col={3} s={12} padding={2}>
            <Box
              padding={4}
              shadow="tableShadow"
              background="neutral0"
              hasRadius
            >
              <Flex alignItems="center" gap={3}>
                <Icon
                  as={Equalizer}
                  color="primary600"
                  width="30px"
                  height="30px"
                />
                <Flex
                  direction="column"
                  alignItems="flex-start"
                  paddingLeft={2}
                >
                  <Box variant="epsilon">ERC 1404 Supply</Box>
                  <Box variant="delta" fontWeight="bold" fontSize="2rem">
                    {`${Number(erc1404Supply).toFixed(2)}`}
                  </Box>
                </Flex>
              </Flex>
            </Box>
          </GridItem>
          <GridItem col={3} s={12} padding={2}>
            <Box
              padding={4}
              shadow="tableShadow"
              background="neutral0"
              hasRadius
            >
              <Flex alignItems="center" gap={3}>
                <Icon
                  as={Equalizer}
                  color="primary600"
                  width="30px"
                  height="30px"
                />
                <Flex
                  direction="column"
                  alignItems="flex-start"
                  paddingLeft={2}
                >
                  <Box variant="epsilon">ERC 3643 Supply</Box>
                  <Box variant="delta" fontWeight="bold" fontSize="2rem">
                    1
                  </Box>
                </Flex>
              </Flex>
            </Box>
          </GridItem>
          <GridItem col={3} s={12} padding={2}>
            <Box
              padding={4}
              shadow="tableShadow"
              background="neutral0"
              hasRadius
            >
              <Flex alignItems="center" gap={3}>
                <Icon
                  as={Equalizer}
                  color="primary600"
                  width="30px"
                  height="30px"
                />
                <Flex
                  direction="column"
                  alignItems="flex-start"
                  paddingLeft={2}
                >
                  <Box variant="epsilon">ERC 7518 Supply</Box>
                  <Box variant="delta" fontWeight="bold" fontSize="2rem">
                    1
                  </Box>
                </Flex>
              </Flex>
            </Box>
          </GridItem>
          <GridItem col={3} s={12} padding={2}>
            <Box
              padding={4}
              shadow="tableShadow"
              background="neutral0"
              hasRadius
            >
              <Flex alignItems="center" gap={3}>
                <Icon
                  as={Equalizer}
                  color="primary600"
                  width="30px"
                  height="30px"
                />
                <Flex
                  direction="column"
                  alignItems="flex-start"
                  paddingLeft={2}
                >
                  <Box fontWeight="bold" fontSize="1rem">
                    Total Holders
                  </Box>
                  <Box fontWeight="bold" fontSize="2rem">
                    1
                  </Box>
                </Flex>
              </Flex>
            </Box>
          </GridItem>
          <GridItem col={3} s={12} padding={2}>
            <Box
              padding={4}
              shadow="tableShadow"
              background="neutral0"
              hasRadius
            >
              <Flex alignItems="center" gap={3}>
                <Icon
                  as={Equalizer}
                  color="primary600"
                  width="30px"
                  height="30px"
                />
                <Flex
                  direction="column"
                  alignItems="flex-start"
                  paddingLeft={2}
                >
                  <Box variant="epsilon" fontWeight="bold">
                    Total Circulation
                  </Box>
                  <Box variant="delta" fontWeight="bold" fontSize="2rem">
                    1
                  </Box>
                </Flex>
              </Flex>
            </Box>
          </GridItem>
          <GridItem col={3} s={12} padding={2}>
            <Box
              padding={2}
              shadow="tableShadow"
              background="neutral0"
              hasRadius
            >
              <Select
                placeholder="Select option"
                label="Blockchain"
                name="dropdown"
                className="card"
              >
                <Option value="all">All</Option>
                <Option value="ETH">ETH</Option>
                <Option value="Metic">Polygon</Option>
                <Option value="binance">Binance</Option>
              </Select>
            </Box>
          </GridItem>
        </Grid>

        {/* Quick Access Section */}
        <Typography variant="beta" as="h2" paddingBottom={4} paddingTop={10}>
          Quick Access
        </Typography>

        <Grid gap={2}>
          <GridItem col={4} s={12} padding={2}>
            <Card padding={2} className="card">
              <CardBody>
                <Flex alignItems="center" gap={3}>
                  <Icon
                    as={User}
                    color="primary600"
                    width="30px"
                    height="30px"
                  />
                  <Flex direction="column" alignItems="flex-start">
                    <CardTitle style={{ fontSize: "1.5rem" }}>
                      Admin Management
                    </CardTitle>
                  </Flex>
                </Flex>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem col={4} s={12} padding={2}>
            <Card
              padding={2}
              className="card"
              onClick={() => history.push("/plugins/dash-board/create-token")}
            >
              <CardBody>
                <Flex alignItems="center" gap={3}>
                  <Icon
                    as={User}
                    color="primary600"
                    width="30px"
                    height="30px"
                  />
                  <Flex
                    direction="column"
                    fontSize="3rem"
                    alignItems="flex-start"
                  >
                    <CardTitle style={{ fontSize: "1.5rem" }}>
                      Create Token
                    </CardTitle>
                  </Flex>
                </Flex>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem col={4} s={12} padding={2}>
            <Card padding={2} className="card">
              <CardBody>
                <Flex alignItems="center" gap={3}>
                  <Icon
                    as={User}
                    color="primary600"
                    width="30px"
                    height="30px"
                  />
                  <Flex direction="column" alignItems="flex-start">
                    <CardTitle style={{ fontSize: "1.5rem" }}>
                      Add Auction
                    </CardTitle>
                  </Flex>
                </Flex>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem col={4} s={12} padding={2}>
            <Card padding={2} className="card">
              <CardBody>
                <Flex alignItems="center" gap={3}>
                  <Icon
                    as={CheckCircle}
                    color="primary600"
                    width="30px"
                    height="30px"
                  />
                  <Flex direction="column" alignItems="flex-start">
                    <CardTitle style={{ fontSize: "1.5rem" }}>
                      Approve Property
                    </CardTitle>
                  </Flex>
                </Flex>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem col={4} s={12} padding={2}>
            <Card padding={2} className="card">
              <CardBody>
                <Flex alignItems="center" gap={3}>
                  <Icon
                    as={Message}
                    color="primary600"
                    width="30px"
                    height="30px"
                  />
                  <Flex direction="column" alignItems="flex-start">
                    <CardTitle style={{ fontSize: "1.5rem" }}>
                      About Us Content
                    </CardTitle>
                  </Flex>
                </Flex>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem col={4} s={12} padding={2}>
            <Card padding={2} className="card">
              <CardBody>
                <Flex alignItems="center" gap={3}>
                  <Icon
                    as={Message}
                    color="primary600"
                    width="30px"
                    height="30px"
                  />
                  <Flex direction="column" alignItems="flex-start">
                    <CardTitle style={{ fontSize: "1.5rem" }}>
                      Email Template
                    </CardTitle>
                  </Flex>
                </Flex>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem col={4} s={12} padding={2}>
            <Card
              padding={2}
              className="card"
              onClick={() => history.push("/plugins/dash-board/bridge")}
            >
              <CardBody>
                <Flex alignItems="center" gap={3}>
                  <Icon
                    as={Message}
                    color="primary600"
                    width="30px"
                    height="30px"
                  />
                  <Flex direction="column" alignItems="flex-start">
                    <CardTitle style={{ fontSize: "1.5rem" }}>Bridge</CardTitle>
                  </Flex>
                </Flex>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>

        <Typography variant="beta" as="h2" paddingBottom={4}>
          Assets
        </Typography>

        <Box display={"flex"} justifyContent={"space-between"} className="box">
          <Text>Puffer Finance</Text>
          <Text>$8,554</Text>
        </Box>

        <Box background={"#ffff"} className="table-box">
          <Text bg={"#271fe0"} color={"white"} pl={6} pr={2} w={"fit-content"}>
            Staked
          </Text>

          <TableContainer p={6}>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th></Th>
                  <Th>Blockchain</Th>
                  <Th>Balance</Th>
                  <Th>USD Value</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Proton</Td>
                  <Td>ETH</Td>
                  <Td>2.1221 ETH</Td>
                  <Td>$109</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>

        <Box display={"flex"} justifyContent={"space-between"} className="box">
          <Text>Puffer Finance</Text>
          <Text>$8,554</Text>
        </Box>

        <Box background={"#ffff"} className="table-box">
          <Text bg={"#271fe0"} color={"white"} pl={6} pr={2} w={"fit-content"}>
            Staked
          </Text>

          <TableContainer p={6}>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th></Th>
                  <Th>Blockchain</Th>
                  <Th>Balance</Th>
                  <Th>USD Value</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Proton</Td>
                  <Td>ETH</Td>
                  <Td>2.1221 ETH</Td>
                  <Td>$109</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
