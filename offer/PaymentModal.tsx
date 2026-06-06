"use client";
import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
  Radio,
  Stack,
  Chip,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckIcon from "@mui/icons-material/Check";
import CopyAllOutlined from "@mui/icons-material/CopyAllOutlined";
import { apiService } from "@/app/services/api";
import { useAuth } from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  onComplete: () => void;
  amount: string;
  packageId?: string | null;
  webinarPackageId?: string | null;
  currency: string;
}

interface PaymentData {
  paymentMethod: string;
  receiptFile: File | null;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  open,
  onClose,
  onComplete,
  amount,
  packageId: packageIdProp,
  webinarPackageId,
  currency,
}) => {
  const [paymentData, setPaymentData] = useState<PaymentData>({
    paymentMethod: "Other",
    receiptFile: null,
  });
  const [loading, setLoading] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [displayAmount, setDisplayAmount] = useState<string>(amount); // State to hold the amount to display
  const [packageId, setPackageId] = useState<string | null>(packageIdProp || null);
  const { order } = useAuth();
  const router = useRouter();

  // Fetch VIP package ID from active webinar
  useEffect(() => {
    const effectivePackageId = webinarPackageId || packageIdProp;
    if (effectivePackageId) {
      setPackageId(effectivePackageId); // Set packageId from prop
      // If packageIdProp is provided, we need to fetch its price
      const fetchPackagePrice = async () => {
        try {
          const webinarResponse = await apiService.getActiveWebinar();
          if (webinarResponse.success === 1) {
            const targetPackage = webinarResponse.result.webinar.packages.find(
              (pkg) => pkg.id.toString() === effectivePackageId
            );
            if (targetPackage) {
              const discountedPrice = targetPackage.price - (targetPackage.price * (targetPackage.discount / 100));
              setDisplayAmount(Math.floor(discountedPrice).toString());
            }
          }
        } catch (error) {
          console.error("Error fetching package price:", error);
        }
      };
      if (open) fetchPackagePrice();
    } else if (open) {
      // Only fetch if packageId is not provided via props
      const fetchVipPackageId = async () => {
        try {
          const webinarResponse = await apiService.getActiveWebinar();
          console.log("This is Payment model call", webinarResponse);
          if (webinarResponse.success === 1) {
            const vipPackage = webinarResponse.result.webinar.packages.find(
              (pkg) => pkg.name.toLowerCase() === "vip"
            );
            if (vipPackage) {
              setPackageId(vipPackage.id.toString());
              const discountedPrice = vipPackage.price - (vipPackage.price * (vipPackage.discount / 100));
              setDisplayAmount(Math.floor(discountedPrice).toString()); // Set VIP price
            }
          }
        } catch (error) {
          console.error("Error fetching VIP package:", error);
        }
      };

      fetchVipPackageId();
    }
  }, [open, packageIdProp, webinarPackageId]);

  const handlePaymentMethodChange = (method: string) => {
    setPaymentData((prev) => ({ ...prev, paymentMethod: method }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPaymentData((prev) => ({ ...prev, receiptFile: file }));
      setError(null); // Clear any previous errors
    }
  };

  const handleComplete = async () => {
    if (!paymentData.receiptFile || !order?.id || !packageId) {
      setError("Please select a file and ensure you have an active order.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await apiService.attachPayment(
        order.id.toString(),
        paymentData.receiptFile,
        packageId,
        paymentData.paymentMethod as "cbe" | "telebirr"
      );

      if (response.success === 1) {
        // Success - file uploaded successfully
        onComplete();
        onClose();
        // Redirect to thank you page
        router.push("/thank-you?vip=true");
      } else {
        // Handle error - API returned success: 0
        setError(response.message || "Failed to upload payment proof");
      }
    } catch (error: unknown) {
      // Handle network or other errors
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred while uploading payment proof";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(text);
    setTimeout(() => setCopiedAccount(null), 3000);
  };

  const PaymentDetails = ({
    details,
  }: {
    details: {
      bank: string;
      account: string;
      name: string;
      logo: string;
      value: string;
    };
  }) => {
    const handleCopy = () => {
      copyToClipboard(details.account);
    };

    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 1,
          p: 1,
          border:
            paymentData.paymentMethod === details.value
              ? "2px solid #4088f2"
              : "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "6px",
          background: "rgba(255, 255, 255, 0.05)",
          cursor: "pointer",
        }}
        onClick={() => handlePaymentMethodChange(details.value)}
      >
        <Radio
          checked={paymentData.paymentMethod === details.value}
          size="small"
          sx={{
            color: "rgba(255, 255, 255, 0.4)",
            "&.Mui-checked": {
              color: details.value === "cbe" ? "#4088f2" : "#e93a82",
            },
          }}
        />
        <Box
          sx={{
            width: "24px",
          }}
        >
          <Box
            component="img"
            src={details.logo}
            alt={details.bank}
            sx={{
              width: "100%",
              height: "auto",
              borderRadius: "3px",
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: "0.8rem",
              fontWeight: "600",
            }}
          >
            {details.bank}
          </Typography>
          <Typography
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: "0.7rem",
            }}
          >
            {details.name}
          </Typography>
          <Typography
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: "0.7rem",
              mb: 0.5,
              fontFamily: "monospace",
            }}
          >
            {details.account}
          </Typography>
          <Chip
            label={copiedAccount === details.account ? "Copied!" : "Copy"}
            clickable
            onClick={(e) => {
              e.stopPropagation();
              handleCopy();
            }}
            icon={
              copiedAccount === details.account ? (
                <CheckIcon />
              ) : (
                <CopyAllOutlined />
              )
            }
            size="small"
            sx={{
              height: "20px",
              fontSize: "0.65rem",
              backgroundColor:
                copiedAccount === details.account
                  ? "#4caf50"
                  : "rgba(255, 255, 255, 0.1)",
              color: "white",
              "&:hover": {
                backgroundColor:
                  copiedAccount === details.account
                    ? "#4caf50"
                    : "rgba(255, 255, 255, 0.2)",
              },
              "& .MuiChip-icon": {
                fontSize: "0.7rem",
              },
            }}
          />
        </Box>
      </Box>
    );
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: "520px" },
          maxWidth: "520px",
          maxHeight: "120vh",
          padding: "10px",
          overflowY: "auto",
          background:
            "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0a0a0a 100%)",
          borderRadius: "12px",
          boxShadow: "0 15px 40px rgba(0, 0, 0, 0.7)",
          border: "1px solid rgba(233, 58, 130, 0.2)",
          outline: "none",
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            color: "rgba(255, 255, 255, 0.6)",
            zIndex: 10,
            "&:hover": {
              color: "white",
              backgroundColor: "rgba(255, 255, 255, 0.08)",
            },
          }}
        >
          <CloseIcon sx={{ fontSize: "1rem" }} />
        </IconButton>

        {/* Header */}
        <Box sx={{ px: 2, pt: 2, pb: 1 }}>
          <Typography
            sx={{
              fontSize: "1rem",
              fontWeight: "600",
              color: "white",
              textAlign: "center",
              mb: 0.5,
            }}
          >
            Complete VIP Payment
          </Typography>
          <Typography
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: "1.4rem",
              textAlign: "center",
            }}
          >
            Amount:{" "}
            <span style={{ color: "#e93a82", fontWeight: "600" }}>
              {displayAmount} {currency}
            </span>
          </Typography>
        </Box>

        {/* Error Alert */}
        {error && (
          <Box sx={{ px: 2, pb: 1 }}>
            <Alert
              severity="error"
              sx={{
                mb: 1,
                backgroundColor: "rgba(211, 47, 47, 0.1)",
                color: "white",
                "& .MuiAlert-icon": {
                  color: "#f44336",
                },
                border: "1px solid rgba(211, 47, 47, 0.3)",
              }}
            >
              {error}
            </Alert>
          </Box>
        )}

        {/* Payment Content */}
        <Box sx={{ px: 2, pb: 2 }}>
          {/* Bank Selection */}
          <Box sx={{ mb: 2 }}>
            <Typography
              sx={{
                color: "white",
                fontSize: "0.85rem",
                fontWeight: "600",
                mb: 1,
              }}
            >
              Select Payment Method
            </Typography>

            <Stack gap={1}>
              <PaymentDetails
                details={{
                  bank: "Commercial Bank Of Ethiopia",
                  account: "1000221958587",
                  name: "Yonas Mohammed",
                  logo: "/images/cbe.png",
                  value: "cbe",
                }}
              />
              <PaymentDetails
                details={{
                  bank: "Telebirr",
                  account: "0962635638",
                  name: "Yonas Mohammed",
                  logo: "/images/tele_birr.png",
                  value: "telebirr",
                }}
              />
            </Stack>
          </Box>

          {/* File Upload Section */}
          <Box sx={{ mb: 2 }}>
            <Typography
              sx={{
                color: "white",
                fontSize: "0.85rem",
                fontWeight: "600",
                mb: 1,
              }}
            >
              Attach payment screenshot
            </Typography>

            <Box
              sx={{
                border: "1.5px dashed rgba(255, 255, 255, 0.25)",
                borderRadius: "6px",
                p: 1.5,
                textAlign: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",
                "&:hover": {
                  border: "1.5px dashed #4088f2",
                  background: "rgba(64, 136, 242, 0.03)",
                },
              }}
              component="label"
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                style={{ display: "none" }}
              />

              {paymentData.receiptFile ? (
                <Box>
                  <CheckCircleIcon
                    sx={{ color: "#4caf50", fontSize: "1.5rem", mb: 0.5 }}
                  />
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "0.75rem",
                      fontWeight: "600",
                      mb: 0.5,
                    }}
                  >
                    File Uploaded
                  </Typography>
                  <Typography
                    sx={{
                      color: "rgba(255, 255, 255, 0.6)",
                      fontSize: "0.65rem",
                    }}
                  >
                    {paymentData.receiptFile.name}
                  </Typography>
                </Box>
              ) : (
                <Box>
                  <CloudUploadIcon
                    sx={{
                      color: "rgba(255, 255, 255, 0.4)",
                      fontSize: "1.5rem",
                      mb: 0.5,
                    }}
                  />
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "0.75rem",
                      fontWeight: "600",
                      mb: 0.5,
                    }}
                  >
                    Attach
                  </Typography>
                  <Typography
                    sx={{
                      color: "rgba(255, 255, 255, 0.5)",
                      fontSize: "0.65rem",
                    }}
                  >
                    PNG, JPG, or JPEG up to 5MB
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>

          {/* Complete Button */}
          <Button
            onClick={handleComplete}
            disabled={!paymentData.receiptFile || loading}
            fullWidth
            sx={{
              background:
                paymentData.receiptFile && !loading
                  ? "linear-gradient(90deg, #e93a82 0%, #4088f2 100%)"
                  : "rgba(255, 255, 255, 0.08)",
              color: "white",
              py: 1,
              fontSize: "0.85rem",
              fontWeight: "600",
              textTransform: "none",
              borderRadius: "6px",
              "&:hover": {
                background:
                  paymentData.receiptFile && !loading
                    ? "linear-gradient(90deg, #4088f2 0%, #e93a82 100%)"
                    : "rgba(255, 255, 255, 0.08)",
                transform:
                  paymentData.receiptFile && !loading
                    ? "translateY(-1px)"
                    : "none",
                boxShadow:
                  paymentData.receiptFile && !loading
                    ? "0 4px 15px rgba(233, 58, 130, 0.3)"
                    : "none",
              },
              "&:disabled": {
                color: "rgba(255, 255, 255, 0.3)",
              },
            }}
          >
            {loading ? "Processing..." : "Complete Payment"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default PaymentModal;
