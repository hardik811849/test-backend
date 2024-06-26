// import {
//   Box,
//   Flex,
//   Button,
//   Select,
//   Switch,
//   Radio,
//   RadioGroup,
//   Checkbox,
//   Icon,
//   Typography,
//   FieldInput,
// } from "@strapi/design-system";
import React, { useState } from "react";
// import "./bridge.css";
import { Box, Button, Input, Select, Text, Textarea } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

const Bridge = () => {
  const [fromChain, setFromChain] = useState("Ethereum");
  const [toChain, setToChain] = useState("Polygon");
  const [amount, setAmount] = useState("");
  const [receiveToken, setReceiveToken] = useState("USDC");
  const [bridgeToAnotherAddress, setBridgeToAnotherAddress] = useState(false);
  const [balance, setBalance] = useState(0);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleBridgeToggle = () => {
    setBridgeToAnotherAddress(!bridgeToAnotherAddress);
  };

  return (
    <Box
      p={10}
      m={"auto"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box>
        <Text fontSize={"2rem"} fonrWeight={"bold"}>
          Bridge
        </Text>
        <Box
          bg={"white"}
          p={5}
          w={"100%"}
          border={"1px solid lightgray"}
          borderRadius={"14px"}
          mt={"3rem"}
        >
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box w={"40%"} borderRadius={"14px"} bg={"#f5f5f7"} p={3}>
              <label style={{ marginLeft: "16px", color: "gray" }}>From</label>
              <Select
                border={"none"}
                w={"100%"}
                fontWeight={"bold"}
                fontSize={"24px"}
                marginTop={"-10px"}
                _focusVisible={{ border: "none", boxShadow: "none" }}
              >
                <option value="PTR">Proton</option>
              </Select>
            </Box>
            <ArrowForwardIcon
              borderRadius={"full"}
              p={1}
              boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
              fontSize={"2rem"}
            />
            <Box w={"40%"} borderRadius={"14px"} bg={"#f5f5f7"} p={3}>
              <label style={{ marginLeft: "16px", color: "gray" }}>To</label>
              <Select
                dir="left"
                border={"none"}
                w={"100%"}
                fontWeight={"bold"}
                fontSize={"24px"}
                marginTop={"-10px"}
                _focusVisible={{ border: "none", boxShadow: "none" }}
              >
                <option value="ETH">Ethereum</option>
                <option value="PTR">Polygon PoS</option>
                <option value="PTR">BNB Smart Chain</option>
                <option value="PTR">Avalanche</option>
              </Select>
            </Box>
          </Box>

          {/* Send */}

          <Box bg={"#f5f5f7"} borderRadius={"14px"} mt={5}>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              p={1}
            >
              <Box w={"40%"} p={3}>
                <label style={{ marginLeft: "16px", color: "gray" }}>
                  Send
                </label>
                <Text ml={"16px"} fontWeight={"bold"} fontSize={"24px"}>
                  PTR
                </Text>
                {/* <Select
                  border={"none"}
                  w={"100%"}
                  fontWeight={"bold"}
                  fontSize={"24px"}
                  _focusVisible={{ border: "none", boxShadow: "none" }}
                >
                  <option value="PTR">PTR</option>
                </Select> */}
                <Text ml={"16px"}>Balance : 0</Text>
              </Box>
              <Input
                fontSize={"24px"}
                p={3}
                w={"50%"}
                type="number"
                placeholder={"0"}
                border={"none"}
                _focusVisible={{ border: "none", boxShadow: "none" }}
                dir="rtl"
              />
            </Box>
          </Box>

          {/* Receive */}

          <Box bg={"#f5f5f7"} borderRadius={"14px"} mt={5}>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              p={1}
            >
              <Box w={"40%"} p={3}>
                <label style={{ marginLeft: "16px", color: "gray" }}>
                  Receive
                </label>
                <Text ml={"16px"} fontWeight={"bold"} fontSize={"24px"}>
                  PTR
                </Text>
                {/* <Select
                  border={"none"}
                  w={"100%"}
                  fontWeight={"bold"}
                  fontSize={"24px"}
                  _focusVisible={{ border: "none", boxShadow: "none" }}
                >
                  <option value="PTR">PTR</option>
                </Select> */}
                <Text ml={"16px"}>Balance : 0</Text>
              </Box>
              <Input
                fontSize={"24px"}
                p={3}
                w={"50%"}
                type="number"
                placeholder={"0"}
                border={"none"}
                _focusVisible={{ border: "none", boxShadow: "none" }}
                dir="rtl"
              />
            </Box>
          </Box>

          {/* Comments */}
          <Textarea placeholder="Enter your Comments" mt={5} isRequired />

          {/* Button */}
          <Button
            mt={5}
            w={"100%"}
            variant={"unstyled"}
            bg={"#271fe0"}
            color={"white"}
          >
            Approve
          </Button>
        </Box>
      </Box>
    </Box>
    // <Box padding={10} className="bridge-parent">
    //   <Box className="bridg-child">
    //     <p className="title">Bridge</p>

    //     <Box className="inner-child">
    //       <div className="bridge-form">
    //         <div className="form-row">
    //           <div className="form-group">
    //             <label>From</label>
    //             <select
    //               value={fromChain}
    //               onChange={(e) => setFromChain(e.target.value)}
    //             >
    //               <option value="Ethereum">Ethereum</option>
    //             </select>
    //           </div>
    //           <div className="arrow">&#8594;</div>
    //           <div className="form-group">
    //             <label>To</label>
    //             <select
    //               value={toChain}
    //               onChange={(e) => setToChain(e.target.value)}
    //             >
    //               <option value="Polygon">Polygon</option>
    //             </select>
    //           </div>
    //         </div>

    //         <div className="form-row">
    //           <div className="form-group form-group1">
    //             <div className="form-group-inner">
    //               <label>Send</label>
    //               <select
    //                 value={toChain}
    //                 onChange={(e) => setToChain(e.target.value)}
    //               >
    //                 <option value="Polygon">Polygon</option>
    //               </select>
    //               <span className="balance">Balance: {balance}</span>
    //             </div>
    //             <div className="form-group-inner1">
    //               <input
    //                 type="number"
    //                 placeholder="0"
    //                 className="amount-input"
    //               />
    //             </div>
    //           </div>
    //         </div>

    //         <div className="form-row">
    //           <div className="form-group">
    //             <label>Receive</label>
    //             <select
    //               value={receiveToken}
    //               onChange={(e) => setReceiveToken(e.target.value)}
    //             >
    //               <option value="USDC">USDC</option>
    //             </select>
    //             <span className="balance">Balance: N/A</span>
    //           </div>
    //         </div>

    //         <div className="form-row toggle-row">
    //           <label>Bridge and send to another address</label>
    //           <input
    //             type="checkbox"
    //             checked={bridgeToAnotherAddress}
    //             onChange={handleBridgeToggle}
    //           />
    //         </div>

    //         <button className="submit-btn">Enter amount</button>
    //       </div>
    //     </Box>
    //   </Box>
    // </Box>
  );
};

export default Bridge;
