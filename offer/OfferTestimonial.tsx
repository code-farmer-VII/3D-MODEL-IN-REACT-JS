"use client";
import {
  Container,
  Box,
  Typography,
  Avatar,
  Rating,
  Card,
  CardContent,
} from "@mui/material";
import React from "react";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import StarIcon from "@mui/icons-material/Star";
import VipPurchaseButton from "./VipPurchaseButton";

// Testimonial data - using placeholder images
const testimonialData = [
  {
    id: 1,
    name: "HABIB",
    role: "Webinar Participant",
    avatar: "/images/testimonials/person.jpg",
    rating: 5,
    text: "I recently attended the Facebook Ads Webinar, and it was such a valuable experience for me. The training was clear, practical, and easy to follow. I would definitely recommend this webinar to anyone who wants to run better Facebook ads and get real results. Thank you for such an amazing session!😊😊😊",
  },
  {
    id: 2,
    name: "Anonymous",
    role: "Webinar Participant",
    avatar: "/images/testimonials/person.jpg",
    rating: 5,
    text: "It wasn't just a course but a life changing amazing experience !!",
  },
  {
    id: 3,
    name: "Anonymous",
    role: "Webinar Participant",
    avatar: "/images/testimonials/person.jpg",
    rating: 5,
    text: "Khilx 4th round Facebook Ad webinar. It's not only a course, it's like a wake up call for me!",
  },
  {
    id: 4,
    name: "Anonymous",
    role: "Webinar Participant",
    avatar: "/images/testimonials/person.jpg",
    rating: 5,
    text: "I was part of the fourth round Facebook ads webinar and it has been an excellent experience three things I mainly picked up from this webinar was how to communicate with clients how to set up my own International payments and how to do Facebook ads and I've been applying them all into my business and life and I would definitely recommend to a friend",
  },
  {
    id: 5,
    name: "Noor",
    role: "Teenager",
    avatar: "/images/testimonials/person.jpg",
    rating: 5,
    text: "My name is Noor and I'm a teenager who was looking for something to do this summer and I saw this webinar for a Facebook ads agency and I joined and it has been absolutely nice. yonas moh has been teaching it down to the basics and he's broken down everything to us so we can understand it easily and I would absolutely recommend this to my friend.",
  },
  {
    id: 6,
    name: "Elizabeth Belay",
    role: "Webinar Participant",
    avatar: "/images/testimonials/person.jpg",
    rating: 5,
    text: "Hi my name is Elizabeth belay I was a member of the 4th round Facebook ads webinar and through this webinar I have learned a lot for example how Facebook ad is professionally done I have learned everything from how to create a pitch to how to open a MasterCard and how to communicate with clients and I would happily recommend this experience to my friends",
  },
];

const OfferTestimonials: React.FC<{ basicPackageId?: string | null }> = ({ basicPackageId }) => {
  return (
    <Box
      sx={{
        // background: "#05070A",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Testimonials Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            },
            gap: { xs: 4, md: 5 },
            mb: 8,
            maxWidth: "100%",
          }}
        >
          {testimonialData.map((testimonial, index) => (
            <Box
              key={testimonial.id}
              sx={{
                flex: 1,
                minWidth: 0,
                maxWidth: "100%",
              }}
            >
              <Card
                sx={{
                  backgroundColor: "rgba(10,12,20,0.7)",
                  borderRadius: "16px",
                  overflow: "hidden",
                  position: "relative",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  height: "100%",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 15px 40px rgba(233, 58, 130, 0.15)",
                    borderColor: "rgba(233, 58, 130, 0.2)",
                  },
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    background:
                      index % 3 === 0
                        ? "linear-gradient(90deg, #e93a82, #4088f2)"
                        : index % 3 === 1
                        ? "linear-gradient(90deg, #4088f2, #e93a82)"
                        : "linear-gradient(90deg, #e93a82, #4088f2, #e93a82)",
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  {/* Quote icon */}
                  <FormatQuoteIcon
                    sx={{
                      fontSize: "2.25rem",
                      color: "rgba(233, 58, 130, 0.3)",
                      mb: 2,
                    }}
                  />

                  {/* Rating */}
                  <Box sx={{ mb: 2, display: "flex" }}>
                    <Rating
                      value={testimonial.rating}
                      readOnly
                      size="small"
                      icon={
                        <StarIcon
                          fontSize="inherit"
                          sx={{ color: "#e93a82" }}
                        />
                      }
                      emptyIcon={
                        <StarIcon
                          fontSize="inherit"
                          sx={{ color: "rgba(255,255,255,0.1)" }}
                        />
                      }
                    />
                  </Box>

                  {/* Testimonial text */}
                  <Typography
                    variant="body1"
                    sx={{
                      color: "rgba(255,255,255,0.9)",
                      fontSize: "0.95rem",
                      mb: 3,
                      lineHeight: 1.7,
                    }}
                  >
                    &quot;{testimonial.text}&quot;
                  </Typography>

                  {/* User info */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mt: 2,
                      pt: 2,
                      borderTop: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <Avatar
                      src={testimonial.avatar}
                      alt="KhilX Academy"
                      sx={{
                        width: 48,
                        height: 48,
                        border: "2px solid",
                        borderColor:
                          index % 3 === 0
                            ? "rgba(233, 58, 130, 0.7)"
                            : index % 3 === 1
                            ? "rgba(64, 136, 242, 0.7)"
                            : "rgba(233, 58, 130, 0.7)",
                        mr: 2,
                      }}
                    />
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          color: "white",
                          fontWeight: "bold",
                          mb: 0.5,
                          fontSize: "1rem",
                        }}
                      >
                        {testimonial.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "rgba(255,255,255,0.6)",
                          fontSize: "0.8rem",
                        }}
                      >
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>

      {/* Add CTA button */}
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
    </Box>
  );
};

export default OfferTestimonials;
