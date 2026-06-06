"use client";
import React from "react";
import { Box, Container, Typography } from "@mui/material";
import GradientBackground from "@/components/GradientBackground";
import VipPurchaseButton from "./VipPurchaseButton";

interface BenefitCard {
  icon: string;
  title: string;
  description: string;
  color: string;
}

interface TestimonialData {
  quote: string;
  author: string;
}

interface BenefitsSectionProps {
  title?: string;
  benefits?: BenefitCard[];
  testimonial?: TestimonialData;
  registeredName?: string; // Added prop for registered name
  basicPackageId?: string | null;
}

const BenefitsSection: React.FC<BenefitsSectionProps> = ({
  title = "Why Choose VIP Access?",
  benefits = [
    {
      icon: "⚡",
      title: "Facebook Ad Agency 3-Day Webinar VIP Access",
      description:
        "Get exclusive strategies and insider secrets directly from top ad experts",
      color: "#e93a82",
    },
    {
      icon: "🎓",
      title: "Exclusive Live Session",
      description:
        "Experience online learning and personalized guidance to choose better path",
      color: "#4088f2",
    },
    {
      icon: "💎",
      title: "Access to private Group and Community ",
      description:
        "Get Special Course and resources valued at 10,000, completely free",
      color: "#e93a82",
    },
    {
      icon: "🚀",
      title: "Ask Questions & Event Recording Access",
      description:
        "Get your doubts cleared live and enjoy lifetime replay access",
      color: "#4088f2",
    },
  ],
  basicPackageId,
}) => {
  return (
    <Box
      className="gradient-bg"
      sx={{
        py: { xs: 6, md: 10 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      <GradientBackground />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            sx={{
              fontSize: { xs: "1.5rem", md: "2rem" },
              fontWeight: "700",
              color: "white",
              mb: 2,
            }}
          >
            🎯 {title}
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "1rem", md: "1.2rem" },
              color: "rgba(255,255,255,0.7)",
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            Discover what Makes Our VIP program the ultimate choice for serious
            student
          </Typography>
        </Box>

        {/* Benefits Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              lg: "repeat(4, 1fr)",
            },
            gap: 4,
            mb: 8,
          }}
        >
          {benefits.map((benefit, index) => (
            <Box
              key={index}
              sx={{
                background: "rgba(10,12,20,0.6)",
                backdropFilter: "blur(10px)",
                border: `2px solid rgba(${
                  benefit.color === "#e93a82" ? "233, 58, 130" : "64, 136, 242"
                }, 0.3)`,
                borderRadius: "16px",
                p: 4,
                textAlign: "center",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: `0 15px 30px rgba(${
                    benefit.color === "#e93a82"
                      ? "233, 58, 130"
                      : "64, 136, 242"
                  }, 0.2)`,
                  border: `2px solid rgba(${
                    benefit.color === "#e93a82"
                      ? "233, 58, 130"
                      : "64, 136, 242"
                  }, 0.5)`,
                },
              }}
            >
              <Box
                sx={{
                  fontSize: "3rem",
                  mb: 2,
                  background: `linear-gradient(135deg, ${
                    benefit.color === "#e93a82"
                      ? "#e93a82, #f06292"
                      : "#4088f2, #42a5f5"
                  })`,
                  borderRadius: "50%",
                  width: "80px",
                  height: "80px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  boxShadow: `0 8px 20px rgba(${
                    benefit.color === "#e93a82"
                      ? "233, 58, 130"
                      : "64, 136, 242"
                  }, 0.3)`,
                }}
              >
                {benefit.icon}
              </Box>
              <Typography
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: "700",
                  color: "white",
                  mb: 2,
                }}
              >
                {benefit.title}
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.95rem",
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: 1.5,
                }}
              >
                {benefit.description}
              </Typography>
            </Box>
          ))}
        </Box>
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
            buttonText="Get VIP Access"
            currentPrice={"2480"}
            currency={"ETB"}
            registeredName={""}
            onPurchase={() => {}}
            variant="offer" 
            basicPackageId={basicPackageId}
            fullWidth={false}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default BenefitsSection;
