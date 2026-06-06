"use client";
import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import {
  ShoppingCart,
  CheckCircle,
  AccessTime,
  Upload,
} from "@mui/icons-material";
import PaymentModal from "./PaymentModal";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";

interface VipPurchaseButtonProps {
  buttonText?: string;
  currentPrice?: string;
  currency?: string;
  registeredName?: string;
  basicPackageId?: string | null;
  onPurchase?: () => void;
  variant?: "offer" | "vip";
  fullWidth?: boolean;
  webinarPackageId?: string | null;
  buttonProps?: React.CSSProperties;
  /** Used on Offer.tsx — show Upgrade button unless VIP pending */
  forceOfferMode?: boolean;
}

const VipPurchaseButton: React.FC<VipPurchaseButtonProps> = ({
  buttonText = "Upgrade to VIP now",
  currentPrice,
  currency = "ETB",
  basicPackageId,
  webinarPackageId,
  registeredName,
  onPurchase,
  variant = "offer",
  fullWidth = true,
  buttonProps = {},
  forceOfferMode = false,
}) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentModalPackageId, setPaymentModalPackageId] = useState<string | null>(null);
  const [paymentModalAmount, setPaymentModalAmount] = useState<string>("0");
  const [isBasic, setIsBasic] = useState(false);
  const router = useRouter();
  const { order } = useAuth();

  // Determine base payment status
  const hasVipPayments = order?.payments && order.payments.length > 0;
  const hasActualVipAccess = order?.is_paid === true;
  const paymentStatus = hasActualVipAccess
    ? "approved"
    : hasVipPayments
    ? "pending"
    : "none";

  // ✅ Detect if there’s a pending VIP order
  const hasPendingVipOrder = order?.payments?.some((payment) => {
    if (payment.status !== "pending") return false;
    const pkg = order?.webinar?.packages?.find((p) => p.id === payment.package);
    return pkg?.name?.toLowerCase() === "vip";
  });

  /** Handle Payment Proof Reupload */
  const handleReupload = () => {
    if (order?.payments && order?.webinar?.packages) {
      const pendingPayment = order.payments.find(
        (payment) => payment.status === "pending"
      );
      if (pendingPayment) {
        const webinarPackage = order.webinar.packages.find(
          (pkg) => pkg.id === pendingPayment.package
        );
        if (webinarPackage) {
          const discountedPrice =
            webinarPackage.price -
            webinarPackage.price * (webinarPackage.discount / 100);
          setPaymentModalPackageId(webinarPackage.id.toString());
          setPaymentModalAmount(Math.floor(discountedPrice).toString());
          setIsPaymentModalOpen(true);
          return;
        }
      }
    }
    setPaymentModalAmount(currentPrice || "0");
    setPaymentModalPackageId(webinarPackageId || null);
    setIsPaymentModalOpen(true);
  };

  const handlePurchase = () => {
    setIsBasic(false);
    setPaymentModalAmount(currentPrice || "0");
    setIsPaymentModalOpen(true);
  };

  const handlePaymentComplete = () => {
    if (onPurchase) onPurchase();
    router.push("/thank-you");
  };

  // Button Styles
  const offerButtonStyles = {
    background: "linear-gradient(90deg, #e93a82 0%, #4088f2 100%)",
    color: "#fff",
    borderRadius: { xs: 9, md: 4 },
    px: 6,
    mx: "auto",
    fontSize: "1.2rem",
    fontWeight: 600,
    ...buttonProps,
  };

  const vipButtonStyles = {
    py: 2,
    px: 4,
    borderRadius: { xs: 9, md: 4 },
    fontSize: "1.1rem",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "1px",
    background: "linear-gradient(90deg, #e93a82 0%, #4088f2 100%)",
    "&:hover": {
      background: "linear-gradient(90deg, #4088f2 0%, #e93a82 100%)",
      transform: "translateY(-2px)",
      boxShadow: "0 8px 25px rgba(233, 58, 130, 0.4)",
    },
    ...buttonProps,
  };

  const buttonStyles = variant === "vip" ? vipButtonStyles : offerButtonStyles;

  // ✅ OFFER MODE (used in Offer.tsx)
  if (forceOfferMode) {
    if (hasPendingVipOrder) {
      // If user has pending VIP order, show re-upload & view status
      return (
        <>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              onClick={handleReupload}
              fullWidth={fullWidth}
              size="large"
              disableElevation
              sx={{
                ...buttonStyles,
                backgroundImage: "linear-gradient(-45deg, #2478FE, #E63C63)",
              }}
              startIcon={<Upload />}
            >
              Re-upload Payment Proof
            </Button>

            <Button
              onClick={() => router.push("/thank-you")}
              fullWidth={fullWidth}
              size="large"
              disableElevation
              sx={{
                ...buttonStyles,
                backgroundImage: "linear-gradient(-45deg, #2478FE, #E63C63)",
              }}
              startIcon={<AccessTime />}
            >
              View Payment Status
            </Button>

            <Typography
              variant="caption"
              sx={{
                color: "rgba(255, 255, 255, 0.7)",
                textAlign: "center",
                fontSize: "0.8rem",
              }}
            >
              Your payment for the VIP package is being processed.
            </Typography>

            <PaymentModal
              open={isPaymentModalOpen}
              onClose={() => setIsPaymentModalOpen(false)}
              onComplete={handlePaymentComplete}
              amount={paymentModalAmount}
              packageId={isBasic ? basicPackageId : undefined}
              webinarPackageId={paymentModalPackageId}
              currency={currency}
            />
          </Box>
        </>
      );
    }

    // Otherwise show Upgrade to VIP now
    return (
      <>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            width: fullWidth ? "100%" : "auto",
          }}
        >
          <Button
            onClick={handlePurchase}
            fullWidth={fullWidth}
            size="large"
            disableElevation
            sx={{
              ...buttonStyles,
              backgroundImage: "linear-gradient(-45deg, #2478FE, #E63C63)",
              "&:hover": {
                backgroundImage: "linear-gradient(-45deg, #E63C63, #2478FE)",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 25px rgba(36, 120, 254, 0.4)",
              },
            }}
            startIcon={
              variant === "offer" ? (
                <ShoppingCart sx={{ display: { xs: "none", md: "block" } }} />
              ) : undefined
            }
          >
            Upgrade to VIP now
          </Button>
        </Box>

        <PaymentModal
          open={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          onComplete={handlePaymentComplete}
          amount={currentPrice || "0"}
          packageId={isBasic ? basicPackageId : undefined}
          webinarPackageId={paymentModalPackageId}
          currency={currency}
        />
      </>
    );
  }

  // ✅ Default logic for all other pages
  const renderButtonContent = () => {
    switch (paymentStatus) {
      case "approved":
        return (
          <Button
            onClick={() => router.push("/thank-you")}
            fullWidth={fullWidth}
            size="large"
            disableElevation
            sx={{
              ...buttonStyles,
              backgroundImage: "linear-gradient(-45deg, #2478FE, #E63C63)",
            }}
            startIcon={<CheckCircle />}
          >
            Access VIP Package
          </Button>
        );

      case "pending":
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              onClick={handleReupload}
              fullWidth={fullWidth}
              size="large"
              disableElevation
              sx={{
                ...buttonStyles,
                backgroundImage: "linear-gradient(-45deg, #2478FE, #E63C63)",
              }}
              startIcon={<Upload />}
            >
              Re-upload Payment Proof
            </Button>

            <Button
              onClick={() => router.push("/thank-you")}
              fullWidth={fullWidth}
              size="large"
              disableElevation
              sx={{
                ...buttonStyles,
                backgroundImage: "linear-gradient(-45deg, #2478FE, #E63C63)",
              }}
              startIcon={<AccessTime />}
            >
              View Payment Status
            </Button>
          </Box>
        );

      default:
        return (
          <Button
            onClick={handlePurchase}
            fullWidth={fullWidth}
            size="large"
            disableElevation
            sx={{
              ...buttonStyles,
              backgroundImage: "linear-gradient(-45deg, #2478FE, #E63C63)",
            }}
            startIcon={
              variant === "offer" ? (
                <ShoppingCart sx={{ display: { xs: "none", md: "block" } }} />
              ) : undefined
            }
          >
            {buttonText}
          </Button>
        );
    }
  };

  return (
    <>
      {renderButtonContent()}
      <PaymentModal
        open={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onComplete={handlePaymentComplete}
        amount={paymentModalAmount}
        packageId={isBasic ? basicPackageId : undefined}
        webinarPackageId={paymentModalPackageId}
        currency={currency}
      />
    </>
  );
};

export default VipPurchaseButton;
