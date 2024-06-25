import {
  Box,
  Button,
  Field,
  Flex,
  Option,
  Select,
  Tabs,
  Typography,
  Grid,
  Tab,
  TabPanel,
  TabGroup,
  TabPanels,
  GridItem,
  FieldLabel,
  FieldInput,
  FieldHint,
  FieldError,
  Switch,
  Checkbox,
} from "@strapi/design-system";
import React, { useState } from "react";
import "./CreateToken.css";
import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";

const CreateToken = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [initialSupply, setInitialSupply] = useState("");
  const [maxSupply, setMaxSupply] = useState("");

  const [selectedBlockchain, setSelectedBlockchain] = useState("");
  const [canBurn, setCanBurn] = useState(false);

  const tokenFactory = "0x7c61A4d7e0d3f7fc802dBA1EA66D1Dd3Ac276857";

  const tokenAbi = [
    {
      constant: false,
      inputs: [
        {
          name: "account",
          type: "address",
        },
      ],
      name: "removeOwner",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "name",
          type: "string",
        },
        {
          name: "symbol",
          type: "string",
        },
        {
          name: "decimals",
          type: "uint8",
        },
        {
          name: "initialSupply",
          type: "uint256",
        },
      ],
      name: "createToken",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          name: "account",
          type: "address",
        },
      ],
      name: "isOwner",
      outputs: [
        {
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "account",
          type: "address",
        },
      ],
      name: "addOwner",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "tokenAddress",
          type: "address",
        },
        {
          indexed: false,
          name: "name",
          type: "string",
        },
        {
          indexed: false,
          name: "symbol",
          type: "string",
        },
        {
          indexed: false,
          name: "decimals",
          type: "uint8",
        },
        {
          indexed: false,
          name: "initialSupply",
          type: "uint256",
        },
        {
          indexed: false,
          name: "owner",
          type: "address",
        },
      ],
      name: "TokenCreated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "addedOwner",
          type: "address",
        },
        {
          indexed: true,
          name: "addedBy",
          type: "address",
        },
      ],
      name: "OwnerAdded",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "removedOwner",
          type: "address",
        },
        {
          indexed: true,
          name: "removedBy",
          type: "address",
        },
      ],
      name: "OwnerRemoved",
      type: "event",
    },
  ];

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const usdaoContract = new ethers.Contract(tokenFactory, tokenAbi, signer);

  const createTokenAndDeploy = async () => {
    console.log("Creating token...");
    try {
      const tx = await usdaoContract.createToken(
        tokenName,
        tokenSymbol,
        18,
        initialSupply
      );
      await tx.wait();
      console.log("Transaction mined:", tx);
      alert("Token created successfully!");
    } catch (error) {
      console.error("Error creating token", error);
      alert("Error creating token: " + error.message);
    }
  };

  const handleTabChange = (selectedIndex) => {
    setSelectedTab(selectedIndex);
  };

  const handleToggle = () => {
    setCanBurn(!canBurn); // Toggle the state
  };

  const handleBlockchainChange = async (e) => {
    const selectedValue = e;
    setSelectedBlockchain(selectedValue);

    try {
      if (window.ethereum) {
        // Prompt user to connect their wallet if not connected
        if (!window.ethereum.isConnected()) {
          await connectWallet();
        }
        await switchNetwork(selectedValue);
      } else {
        // MetaMask is not installed
        alert("Please install MetaMask to use this feature.");
      }
    } catch (error) {
      console.error("Error interacting with MetaMask:", error);
    }
  };

  const connectWallet = async () => {
    try {
      // Request user to connect their wallet
      await window.ethereum.request({ method: "eth_requestAccounts" });
    } catch (error) {
      console.error("Error connecting wallet:", error);
      throw error; // Handle error as needed
    }
  };

  const switchNetwork = async (blockchain) => {
    try {
      // Define network IDs for Ethereum and BSC
      const networks = {
        ETH: "0x1", // Ethereum mainnet
        BSC: "0x61", // Binance Smart Chain mainnet
      };

      // Switch to the network associated with the selected blockchain
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: networks[blockchain] }],
      });
    } catch (error) {
      console.error("Error switching network:", error);
      throw error; // Handle error as needed
    }
  };

  return (
    <div className="parent">
      <div className="dropdown-parent">
        <Box border="1px solid red" width="70%">
          <Select
            placeholder="Create Token"
            value={selectedBlockchain}
            onChange={(e) => handleBlockchainChange(e)}
          >
            <Option value="ETH" className="dropdown_value">
              Create Token on ETH
            </Option>
            <Option value="BSC" className="dropdown_value">
              Create Token on BSC
            </Option>
          </Select>
        </Box>
        <Box marginTop={4} width="70%" bg="neutral100">
          <TabGroup selectedIndex={selectedTab} onTabChange={handleTabChange}>
            <Tabs>
              <Tab className="tabs">ERC 1404 Supply</Tab>
              <Tab className="tabs">ERC 3643 Supply</Tab>
            </Tabs>

            <TabPanels>
              <TabPanel>
                <Box marginTop={4}>
                  <form onSubmit={createTokenAndDeploy}>
                    <Grid gap={4}>
                      <GridItem col={6}>
                        <Field name="tokenName">
                          <FieldLabel fontSize="20rem !important">
                            Token Name
                          </FieldLabel>
                          <FieldInput
                            placeholder="Enter Token Name"
                            onChange={(e) => setTokenName(e.target.value)}
                          />
                          <FieldHint />
                          <FieldError />
                        </Field>
                      </GridItem>
                      <GridItem col={6}>
                        <Field name="tokenSymbol">
                          <FieldLabel>Token Symbol</FieldLabel>
                          <FieldInput
                            placeholder="Enter Token Symbol"
                            onChange={(e) => setTokenSymbol(e.target.value)}
                          />
                          <FieldHint />
                          <FieldError />
                        </Field>
                      </GridItem>
                      <GridItem col={12}>
                        <Grid gap={4}>
                          <GridItem col={4}>
                            <Flex gap={4}>
                              <Checkbox
                                checked={canBurn}
                                onChange={handleToggle}
                              />
                              <Typography fontWeight="bold" fontSize="2rem">
                                Can Burn
                              </Typography>
                            </Flex>
                          </GridItem>
                          <GridItem col={4}>
                            <Flex gap={4}>
                              <Checkbox
                                checked={canBurn}
                                onChange={handleToggle}
                              />
                              <Typography fontWeight="bold" fontSize="2rem">
                                Can Mint
                              </Typography>
                            </Flex>
                          </GridItem>
                          <GridItem col={4}>
                            <Flex gap={4}>
                              <Checkbox
                                checked={canBurn}
                                onChange={handleToggle}
                              />
                              <Typography fontWeight="bold" fontSize="2rem">
                                Can Pause
                              </Typography>
                            </Flex>
                          </GridItem>
                          <GridItem col={4}>
                            <Flex gap={4}>
                              <Checkbox
                                checked={canBurn}
                                onChange={handleToggle}
                              />
                              <Typography fontWeight="bold" fontSize="2rem">
                                Can Blacklist
                              </Typography>
                            </Flex>
                          </GridItem>
                          <GridItem col={4}>
                            <Flex gap={4}>
                              <Checkbox
                                checked={canBurn}
                                onChange={handleToggle}
                              />
                              <Typography fontWeight="bold" fontSize="2rem">
                                Charge Transaction Tax / Fee
                              </Typography>
                            </Flex>
                          </GridItem>
                          <GridItem col={4}>
                            <Flex gap={4}>
                              <Checkbox
                                checked={canBurn}
                                onChange={handleToggle}
                              />
                              <Typography fontWeight="bold" fontSize="2rem">
                                Apply Burn Fee (Deflationary Token)
                              </Typography>
                            </Flex>
                          </GridItem>
                          <GridItem col={4}>
                            <Flex gap={4}>
                              <Checkbox
                                checked={canBurn}
                                onChange={handleToggle}
                              />
                              <Typography fontWeight="bold" fontSize="2rem">
                                Change Owner
                              </Typography>
                            </Flex>
                          </GridItem>
                        </Grid>
                      </GridItem>
                      <GridItem col={12}>
                        <Field name="initialSupply">
                          <FieldLabel>Initial Supply</FieldLabel>
                          <FieldInput
                            type="number"
                            placeholder="Enter initial supply"
                            onChange={(e) => setInitialSupply(e.target.value)}
                          />
                          <FieldHint />
                          <FieldError />
                        </Field>
                      </GridItem>
                      <GridItem col={12}>
                        <Field name="maxSupply">
                          <FieldLabel>Max Supply</FieldLabel>
                          <FieldInput
                            type="number"
                            placeholder="Enter max supply"
                            onChange={(e) => setMaxSupply(e.target.value)}
                          />
                          <FieldHint />
                          <FieldError />
                        </Field>
                      </GridItem>
                      <GridItem col={12}>
                        <Field name="createToken">
                          <FieldInput
                            type="submit"
                            className="create-token"
                            value="Submit"
                            bg="primary600"
                          />
                          <FieldHint />
                          <FieldError />
                        </Field>
                      </GridItem>
                    </Grid>
                  </form>
                </Box>
              </TabPanel>
              <TabPanel>
                <Box marginTop={4}>
                  <form>
                    <Grid gap={4}>
                      <GridItem col={6}>
                        <Field name="tokenName">
                          <FieldLabel fontSize="20rem !important">
                            Token Name
                          </FieldLabel>
                          <FieldInput placeholder="Enter Token Name" />
                          <FieldHint />
                          <FieldError />
                        </Field>
                      </GridItem>
                      <GridItem col={6}>
                        <Field name="tokenSymbol">
                          <FieldLabel>Token Symbol</FieldLabel>
                          <FieldInput placeholder="Enter Token Symbol" />
                          <FieldHint />
                          <FieldError />
                        </Field>
                      </GridItem>
                      <GridItem col={12}>
                        <Grid gap={4}>
                          <GridItem col={4}>
                            <Flex gap={4}>
                              <Checkbox
                                checked={canBurn}
                                onChange={handleToggle}
                              />
                              <Typography fontWeight="bold" fontSize="2rem">
                                Can Burn
                              </Typography>
                            </Flex>
                          </GridItem>
                          <GridItem col={4}>
                            <Flex gap={4}>
                              <Checkbox
                                checked={canBurn}
                                onChange={handleToggle}
                              />
                              <Typography fontWeight="bold" fontSize="2rem">
                                Can Mint
                              </Typography>
                            </Flex>
                          </GridItem>
                          <GridItem col={4}>
                            <Flex gap={4}>
                              <Checkbox
                                checked={canBurn}
                                onChange={handleToggle}
                              />
                              <Typography fontWeight="bold" fontSize="2rem">
                                Can Pause
                              </Typography>
                            </Flex>
                          </GridItem>
                          <GridItem col={4}>
                            <Flex gap={4}>
                              <Checkbox
                                checked={canBurn}
                                onChange={handleToggle}
                              />
                              <Typography fontWeight="bold" fontSize="2rem">
                                Can Blacklist
                              </Typography>
                            </Flex>
                          </GridItem>
                          <GridItem col={4}>
                            <Flex gap={4}>
                              <Checkbox
                                checked={canBurn}
                                onChange={handleToggle}
                              />
                              <Typography fontWeight="bold" fontSize="2rem">
                                Charge Transaction Tax / Fee
                              </Typography>
                            </Flex>
                          </GridItem>
                          <GridItem col={4}>
                            <Flex gap={4}>
                              <Checkbox
                                checked={canBurn}
                                onChange={handleToggle}
                              />
                              <Typography fontWeight="bold" fontSize="2rem">
                                Apply Burn Fee (Deflationary Token)
                              </Typography>
                            </Flex>
                          </GridItem>
                          <GridItem col={4}>
                            <Flex gap={4}>
                              <Checkbox
                                checked={canBurn}
                                onChange={handleToggle}
                              />
                              <Typography fontWeight="bold" fontSize="2rem">
                                Change Owner
                              </Typography>
                            </Flex>
                          </GridItem>
                        </Grid>
                      </GridItem>
                      <GridItem col={12}>
                        <Field name="initialSupply">
                          <FieldLabel>Initial Supply</FieldLabel>
                          <FieldInput
                            type="number"
                            placeholder="Enter initial supply"
                          />
                          <FieldHint />
                          <FieldError />
                        </Field>
                      </GridItem>
                      <GridItem col={12}>
                        <Field name="maxSupply">
                          <FieldLabel>Max Supply</FieldLabel>
                          <FieldInput
                            type="number"
                            placeholder="Enter max supply"
                          />
                          <FieldHint />
                          <FieldError />
                        </Field>
                      </GridItem>
                      <GridItem col={12}>
                        <Field name="createToken">
                          <FieldInput
                            type="submit"
                            className="create-token"
                            value="Create Token"
                            bg="primary600"
                          />
                          <FieldHint />
                          <FieldError />
                        </Field>
                      </GridItem>
                    </Grid>
                  </form>
                </Box>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </Box>
      </div>
    </div>
  );
};

export default CreateToken;
