import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GuessUI from "./GuessUI";
import { ConfirmationModal } from "../../components/ui/ConfirmationModal";
import { getBlockByNumber } from "../../services/service";
import {
  genHashData,
  removePrefix,
  tokenize,
  getUnrevealedHash,
  validateHashFormat,
  ZERO_HASH,
} from "../../utils/hashUtils";
import type { GuessData } from "../../utils/types";const GuessPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const guessId = parseInt(id || "1", 10);

  // State management
  const [paidGuess, setPaidGuess] = useState(false);
  const [overwrite, setOverwrite] = useState(true); // Default to true for demo
  const [complex, setComplex] = useState(false);
  const [blockIncrement, setBlockIncrement] = useState(10); // Start from 10
  const [actualHash, setActualHash] = useState("");
  const [secretHash, setSecretHash] = useState("");
  const [dummyHash, setDummyHash] = useState(ZERO_HASH);
  const [tokenSize, setTokenSize] = useState(4); // Start from 4
  const [tokens, setTokens] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormReadonly, setIsFormReadonly] = useState(false); // Default to false
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    type: "warning" | "error" | "info";
  }>({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
    type: "info",
  });

  useEffect(() => {
    setIsFormReadonly(!overwrite);
  }, [overwrite]);

  useEffect(() => {
    const generateTokens = () => {
      if (
        actualHash &&
        actualHash !== ZERO_HASH &&
        validateHashFormat(actualHash)
      ) {
        const generated = tokenize(actualHash, tokenSize);
        setTokens(generated);
      } else {
        setTokens([]);
      }
    };
    generateTokens();
  }, [actualHash, tokenSize]);

  useEffect(() => {
    const generateDummyHash = () => {
      if (validateHashFormat(actualHash) && validateHashFormat(secretHash)) {
        const combined = getUnrevealedHash(actualHash, secretHash);
        setDummyHash(combined);
      } else {
        setDummyHash(ZERO_HASH);
      }
    };
    generateDummyHash();
  }, [actualHash, secretHash]);

  const handleGenerateHash = async (
    type: "actual" | "secret",
    input: string
  ) => {
    setIsGenerating(true);
    let hashInput = input.trim();
    if (!hashInput) {
      hashInput = Date.now().toString() + Math.random().toString();
    }
    const generatedHash = genHashData(hashInput);

    if (type === "actual") {
      setActualHash("0x" + removePrefix(generatedHash));
    } else {
      setSecretHash("0x" + removePrefix(generatedHash));
    }
    setIsGenerating(false);
  };

  const validateForm = (): string[] => {
    const errors: string[] = [];
    if (!validateHashFormat(actualHash))
      errors.push("Actual Hash must be a valid 64-character hex string.");
    if (!validateHashFormat(secretHash))
      errors.push("Secret Hash must be a valid 64-character hex string.");
    if (blockIncrement < 10)
      errors.push("Block Increment must be 10 or greater.");
    if (tokenSize < 3 || tokenSize > 64)
      errors.push("Token Size must be between 3 and 64.");
    return errors;
  };

  const handleSubmit = async () => {
    const errors = validateForm();
    if (errors.length > 0) {
      setConfirmModal({
        isOpen: true,
        title: "Validation Error",
        message: errors.join("\n"),
        onConfirm: () => setConfirmModal({ ...confirmModal, isOpen: false }),
        type: "error",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const realBlock = await getBlockByNumber(blockIncrement);
      const realBlockHash = String(realBlock.hash);

      const guessData: GuessData = {
        guessId,
        paidGuess,
        overwrite,
        complex,
        blockIncrement,
        actualHash,
        secretHash,
        dummyHash,
        tokenSize,
        tokens,
      };

      // Store data in localStorage for the results page to read
      localStorage.setItem("lastGuessData", JSON.stringify(guessData));
      localStorage.setItem("realBlockHash", realBlockHash);

      const isMatch = realBlockHash.toLowerCase() === actualHash.toLowerCase();

      navigate("/results", {
        state: {
          success: isMatch,
          actualHash,
          realBlockHash,
        },
      });
    } catch (error: any) {
      setConfirmModal({
        isOpen: true,
        title: "Error",
        message: `Failed to fetch block data: ${error.message}`,
        onConfirm: () => setConfirmModal({ ...confirmModal, isOpen: false }),
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    setPaidGuess(false);
    setComplex(false);
    setBlockIncrement(10);
    setActualHash("");
    setSecretHash("");
    setTokenSize(4);
  };

  return (
    <>
      <GuessUI
        guessId={guessId}
        paidGuess={paidGuess}
        onPaidGuessChange={setPaidGuess}
        overwrite={overwrite}
        onOverwriteChange={setOverwrite}
        complex={complex}
        onComplexChange={setComplex}
        blockIncrement={blockIncrement}
        onBlockIncrementChange={(v) => v >= 10 && setBlockIncrement(v)} // Enforce min value
        actualHash={actualHash}
        onActualHashChange={setActualHash}
        secretHash={secretHash}
        onSecretHashChange={setSecretHash}
        dummyHash={dummyHash}
        tokenSize={tokenSize}
        onTokenSizeChange={(v) => v >= 3 && v <= 64 && setTokenSize(v)}
        tokens={tokens}
        isGeneratingActual={isGenerating}
        onGenerateActualHash={() => handleGenerateHash("actual", actualHash)}
        isGeneratingSecret={isGenerating}
        onGenerateSecretHash={() => handleGenerateHash("secret", secretHash)}
        isSubmitting={isSubmitting}
        isFormReadonly={isFormReadonly}
        onSubmit={handleSubmit}
        onClear={handleClear}
        onBack={() => navigate("/")}
      />
      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        onConfirm={confirmModal.onConfirm}
        onCancel={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        type={confirmModal.type}
      />
    </>
  );
};

export default GuessPage;


