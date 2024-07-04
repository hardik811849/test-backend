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
import React, { useEffect, useState } from "react";
import "./CreateToken.css";
import detectEthereumProvider from "@metamask/detect-provider";
import { contractDetails } from "../../blockchain/contractDetails";
import authService from "../../blockchain/authService";
import {
  createTokenMeta,
  getAccountDetails,
} from "../../blockchain/commonFunction";

const CreateToken = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [initialSupply, setInitialSupply] = useState("");
  const [maxSupply, setMaxSupply] = useState("");
  const [address, setAddress] = useState();
  const [selectedBlockchain, setSelectedBlockchain] = useState("");
  const [canBurn, setCanBurn] = useState(false);
  const [canMint, setCanMint] = useState(false);
  const [canPause, setCanPause] = useState(false);
  const [canBlacklist, setCanBlacklist] = useState(false);
  const [canChargeTransaction, setCanChargeTransaction] = useState(false);
  const [canApplyBurnFee, setCanApplyBurnFee] = useState(false);
  const [canChangeOwner, setCanChangeOwner] = useState(false);
  const [token, setToken] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [config, setConfig] = useState({
    canBurn: false,
    canMint: false,
    canPause: false,
    canBlacklist: false,
    changeTax: false,
    applyBurnFee: false,
    changeOwner: false,
  });

  // const provider = new ethers.providers.Web3Provider(window.ethereum);
  // const signer = provider.getSigner();

  const createTokenAndDeploy = async (e) => {
    e.preventDefault();

    if (!selectedBlockchain) {
      return alert("Please select blockchain");
    }
    // if (!selectedTab) {
    //   return alert("Please select token Supply");
    // }
    if (!tokenName) {
      return alert("Please fill token Name");
    }
    if (!tokenSymbol) {
      return alert("Please fill token symbol ");
    }

    if (token.length <= 0) {
      return alert("Select Type of tokens");
    }

    if (!initialSupply) {
      return alert("Please fill initial Supply");
    }
    if (!maxSupply) {
      return alert("Please fill max Supply");
    }

    try {
      let data = {
        tokenName: tokenName,
        symbol: tokenSymbol,
        initialSupply: parseFloat(initialSupply),
        maxSupply: parseFloat(maxSupply),
        config: config,
        owner: "address",
      };
      let tn = await authService.createToken(data);
      console.log(tn.data);
      let tokenCreation = await createTokenMeta(tn.data.abi, tn.data.bytecode);
      alert("Token created successfully!");
    } catch (error) {
      console.error("Error creating token", error);
      alert("Error creating token: " + error.message);
    }
  };

  useEffect(() => {
    (async () => {
      let add = await getAccountDetails();
      // console.log("add--->", add);
      setAddress(add);
    })();
  }, []);

  useEffect(() => {
    setSubmit(true);
  }, [token]);

  const handleTabChange = (selectedIndex) => {
    setSelectedTab(selectedIndex);
  };

  const handleToggle = (value, e) => {
    setConfig({
      ...config,
      [e.target.name]: e.target.checked,
    });
    let { checked } = e.target;
    if (value === "Can Burn") {
      if (checked) {
        setToken((pre) => [...pre, value]);
        // setToken((pre) => [...pre, value]);
        setCanBurn(!canBurn);
      } else {
        setCanBurn(!canBurn);
        setToken((pre) => {
          return [...pre.filter((val) => val !== value)];
        });
      }
    }
    if (value === "Can Mint") {
      if (checked) {
        setToken((pre) => [...pre, value]);
        setCanMint(!canMint);
      } else {
        setCanMint(!canMint);
        setToken((pre) => {
          return [...pre.filter((val) => val !== value)];
        });
      }
    }
    if (value === "Can Pause") {
      if (checked) {
        setToken((pre) => [...pre, value]);
        setCanPause(!canPause);
      } else {
        setCanPause(!canPause);
        setToken((pre) => {
          return [...pre.filter((val) => val !== value)];
        });
      }
    }
    if (value === "Can Blacklist") {
      if (checked) {
        setToken((pre) => [...pre, value]);
        setCanBlacklist(!canBlacklist);
      } else {
        setCanBlacklist(!canBlacklist);
        setToken((pre) => {
          return [...pre.filter((val) => val !== value)];
        });
      }
    }
    if (value === "Charge Transaction") {
      if (checked) {
        setToken((pre) => [...pre, value]);
        setCanChargeTransaction(!canChargeTransaction);
      } else {
        setCanChargeTransaction(!canChargeTransaction);
        setToken((pre) => {
          return [...pre.filter((val) => val !== value)];
        });
      }
    }
    if (value === "Apply Burn Fee") {
      if (checked) {
        setToken((pre) => [...pre, value]);
        setCanApplyBurnFee(!canApplyBurnFee);
      } else {
        setCanApplyBurnFee(!canApplyBurnFee);
        setToken((pre) => {
          return [...pre.filter((val) => val !== value)];
        });
      }
    }
    if (value === "Change Owner") {
      if (checked) {
        setToken((pre) => [...pre, value]);
        setCanChangeOwner(!canChangeOwner);
      } else {
        setCanChangeOwner(!canChangeOwner);
        setToken((pre) => {
          return [...pre.filter((val) => val !== value)];
        });
      }
    }
  };

  // useEffect(() => {
  //   console.log("----->", address);
  // }, []);

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
        <Box marginTop={4}>
          <Grid>
            {token.map((item) => (
              <GridItem col={3} padding={1}>
                <Box className="TokenName">
                  <FieldLabel>{item}</FieldLabel>
                </Box>
              </GridItem>
            ))}
          </Grid>
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
                  <form onSubmit={(e) => createTokenAndDeploy(e)}>
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
                                name="canBurn"
                                onChange={(e) => handleToggle("Can Burn", e)}
                              />
                              <Typography fontWeight="bold" fontSize="2rem">
                                Can Burn
                              </Typography>
                            </Flex>
                          </GridItem>
                          <GridItem col={4}>
                            <Flex gap={4}>
                              <Checkbox
                                checked={canMint}
                                name="canMint"
                                onChange={(e) => handleToggle("Can Mint", e)}
                              />
                              <Typography fontWeight="bold" fontSize="2rem">
                                Can Mint
                              </Typography>
                            </Flex>
                          </GridItem>
                          <GridItem col={4}>
                            <Flex gap={4}>
                              <Checkbox
                                checked={canPause}
                                name="canPause"
                                onChange={(e) => handleToggle("Can Pause", e)}
                              />
                              <Typography fontWeight="bold" fontSize="2rem">
                                Can Pause
                              </Typography>
                            </Flex>
                          </GridItem>
                          <GridItem col={4}>
                            <Flex gap={4}>
                              <Checkbox
                                checked={canBlacklist}
                                name={canBlacklist}
                                onChange={(e) =>
                                  handleToggle("Can Blacklist", e)
                                }
                              />
                              <Typography fontWeight="bold" fontSize="2rem">
                                Can Blacklist
                              </Typography>
                            </Flex>
                          </GridItem>
                          <GridItem col={4}>
                            <Flex gap={4}>
                              <Checkbox
                                checked={canChargeTransaction}
                                name="changeTax"
                                onChange={(e) =>
                                  handleToggle("Charge Transaction", e)
                                }
                              />
                              <Typography fontWeight="bold" fontSize="2rem">
                                Charge Transaction Tax / Fee
                              </Typography>
                            </Flex>
                          </GridItem>
                          <GridItem col={4}>
                            <Flex gap={4}>
                              <Checkbox
                                checked={canApplyBurnFee}
                                name="applyBurnFee"
                                onChange={(e) =>
                                  handleToggle("Apply Burn Fee", e)
                                }
                              />
                              <Typography fontWeight="bold" fontSize="2rem">
                                Apply Burn Fee (Deflationary Token)
                              </Typography>
                            </Flex>
                          </GridItem>
                          <GridItem col={4}>
                            <Flex gap={4}>
                              <Checkbox
                                checked={canChangeOwner}
                                name="changeOwner"
                                onChange={(e) =>
                                  handleToggle("Change Owner", e)
                                }
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
                                // checked={canBurn}
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
                                // checked={canBurn}
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
                                // checked={canBurn}
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
                                // checked={canBurn}
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
                                // checked={canBurn}
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
                                // checked={canBurn}
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
                                // checked={canBurn}
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
                            disabled={submit}
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
