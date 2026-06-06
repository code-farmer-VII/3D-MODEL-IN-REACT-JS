"use client";
import React from "react";
import { Box, Chip, Container, Typography } from "@mui/material";
import VideoContainer from "@/components/VideoContainer";
import VipPurchaseButton from "./VipPurchaseButton";
import { Star } from "@mui/icons-material";

interface OfferHeroProps {
  subtitle?: string;
  title?: string;
  description?: string;
  registeredName?: string;
  videoTitle?: string;
  videoUrl?: string; 
  basicPackageId?: string | null;
  posterImage?: string;
}

const OfferHero: React.FC<OfferHeroProps> = ({
  title = "Welcome",
  registeredName = "",
  description = "I have a special offer for you",
  videoTitle = "Exclusive VIP Training",
  videoUrl,
  basicPackageId,
  posterImage = "/images/webinar-poster.jpg",
}) => {
  return (
    <Box
      className="gradient-bg"
      sx={{
        pt: { xs: 12, md: 12 },
        pb: { xs: 6, md: 6 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Box>
            <Chip
              icon={<Star sx={{ color: "#FFD700 !important" }} />}
              label="🎄 The First Educational New Year Event"
              sx={{
                background:
                  "linear-gradient(90deg, rgba(255, 68, 124, 0.2), rgba(64, 136, 242, 0.2))",
                color: "white",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(10px)",
                fontSize: "1rem",
                fontWeight: "600",
                py: 3,
                mb: 2,
                px: 2,
                "& .MuiChip-icon": {
                  color: "#FFD700",
                },
              }}
            />
          </Box>

          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2rem", sm: "3rem" },
              fontWeight: "900",
              color: "white",
              mb: 3,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            {title} {registeredName}!
          </Typography>

          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.5rem" },
              fontWeight: "400",
              color: "rgba(255, 255, 255, 0.85)",
              mb: 4,
              lineHeight: 1.5,
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            {description}
          </Typography>
        </Box>

        {/* Video Section */}
        <Box
          sx={{
            mx: "auto",
            mb: 6,
          }}
        >
          <VideoContainer
            promoHeader=""
            promoTitle={videoTitle}
            challengeDays={3}
            video={videoUrl}
            challengeDateRange="Limited Time Offer"
            posterImage={posterImage}
          />
        </Box>
      </Container>
      <Box
        sx={{
          mt: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <VipPurchaseButton
          buttonText="Upgrade to VIP"
          currentPrice={"2480"}
          currency={"ETB"}
          registeredName={""}
          onPurchase={() => {}}
          variant="offer"
          basicPackageId={basicPackageId}
          fullWidth={false}
        />
      </Box>
    </Box>
  );
};

export default OfferHero;
