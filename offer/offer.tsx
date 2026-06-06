import {
  Box,
  colors,
  Container,
  List,
  ListItem,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { DoneAll } from "@mui/icons-material";
import { Course } from "@/config/types";
// import { server_url } from "@/config/constants";

import { currencyFormat_ } from "@/utils";
import { KhilxDivider } from "@/ui/divider";
import { YouCntEnroll } from "@/ui/cantenrollnow";
import VipPurchaseButton from "./VipPurchaseButton";

export const Offer = ({
  values,
  // image,
  course,
  onPurchase,
  registeredName,
  currentPrice,
  currency = "ETB",
  basicPackageId,
}: {
  values: Course["values"];
  image: string;
  course: Course;
  onPurchase?: () => void;
  registeredName?: string;
  currentPrice?: string;
  currency?: string;
  basicPackageId?: string;
}) => {
  return (
    <Box className="gradient-bg" sx={{ py: 8 }}>
      <Container maxWidth={false} sx={{ maxWidth: "800px" }}>
        <Box
          sx={{
            border: "1px",
            borderRadius: 2,
            pb: 8,
            px: 4,
            position: "relative",
            borderColor: "transparent",
            bgcolor: "#0c1c2c",
            // backgroundImage:
            //   "radial-gradient(ellipse 80% 80% at 50% -10%,#D91C5E33, hsl(210, 100%, 16%, .4), transparent)",
            "&:after": {
              position: "absolute",
              top: "-1px",
              left: "-1px",
              right: "-1px",
              bottom: "-1px",
              background: `linear-gradient(to left, #2478FE, #E63C63, #2478FE, #E63C63)`,
              content: '""',
              zIndex: -1,
              borderRadius: 2,
            },
          }}
        >
          {/* <Box
            component={"img"}
            alt={"Khilx Webinar"}
            src={
              image.startsWith("/")
                ? image
                : `${server_url}/course_image/${image}`
            }
            style={{
              width: "100%",
              height: "auto",
            }}
          /> */}
          <Box sx={{ padding: { xs: 8 } }} />
          <Typography
            align={"center"}
            color={"#fff"}
            fontSize={"2rem"}
            fontWeight={700}
          >
            Here is What You Get Inside
          </Typography>
          <List dense sx={{ px: 0, mt: 2 }}>
            {values?.map((offr) => (
              <ListItem
                sx={{ display: "flex", alignItems: "flex-start" }}
                key={offr.title}
              >
                <ListItemIcon sx={{ mr: 1, mt: 0.5 }}>
                  <DoneAll
                    sx={{
                      color: `${colors.blue[900]} !important`,
                      width: "20px !important",
                      height: "20px !important",
                    }}
                  />
                </ListItemIcon>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Typography color={"#fff"} fontSize={"0.9rem"}>
                    {offr.title}
                  </Typography>
                  <Typography
                    color={colors.green[400]}
                    fontSize={"1rem"}
                    whiteSpace={"nowrap"}
                    sx={{
                      fontWeight: "700 !important",
                    }}
                  >
                    {offr.value}
                  </Typography>
                </Box>
              </ListItem>
            ))}
          </List>
          <KhilxDivider sx={{ mt: 3 }} />
          <Box
            sx={{
              mt: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              align={"center"}
              color={"#fff"}
              sx={{
                fontSize: {
                  xs: "1.4rem",
                  md: "2rem",
                  lg: "2.4rem",
                },
                fontWeight: {
                  xs: 500,
                  md: 600,
                  lg: 700,
                  xl: 800,
                },
                "& span": {
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: "50%",
                    left: "-15px",
                    right: "-15px",
                    height: "4px",
                    bgcolor: "#E73B62",
                    transform: "translateY(-50%) rotate(-10deg)",
                  },
                  // "&::after": {
                  //     content: '""',
                  //     position: "absolute",
                  //     top: "50%",
                  //     left: "-15px",
                  //     right: "-15px",
                  //     height: "1px",
                  //     bgcolor: "#E73B62",
                  //     transform: "translateY(-50%) rotate(10deg)"
                  // },
                },
              }}
            >
              Total Value:&nbsp;&nbsp;&nbsp;<span>{course.total_value}</span>
            </Typography>
            <Typography
              fontWeight={600}
              color={"#257DC2"}
              align={"center"}
              sx={{
                fontSize: {
                  xs: "1.4rem",
                  md: "2rem",
                  lg: "2.4rem",
                },
              }}
            >
              UPGRADE TO VIP FOR ONLY
            </Typography>
            <Typography
              align={"center"}
              lineHeight={"8rem"}
              fontWeight={700}
              sx={{
                width: "100%",
                // fontSize: 'clamp(2rem, 10vw, 2.15rem)',
                backgroundImage:
                  "linear-gradient(to right, #33A5FF 30%,  #FF7796)",
                color: "transparent",
                backgroundClip: "text",
                mb: 2,
                "& span": {
                  fontSize: "2rem",
                },
                fontSize: {
                  xs: "4rem",
                  md: "4rem",
                  lg: "6rem",
                },
              }}
            >
              {currencyFormat_(Math.floor(course.discounted_price))}
              <span>ETB</span>
            </Typography>
        <VipPurchaseButton
          buttonText="Upgrade to VIP now"
          currentPrice={
            currentPrice || Math.floor(course.discounted_price).toString()
          }
          currency={currency}
          registeredName={registeredName}
          onPurchase={onPurchase}
          variant="offer"
          fullWidth={false}
          basicPackageId={basicPackageId}
          forceOfferMode // ✅ works as expected now
        />




            <YouCntEnroll />
            <Typography
              sx={{
                mt: 4,
                color: "#fff",
                opacity: 0.5,
                fontSize: {
                  xs: "1.3rem",
                  md: "1.4rem",
                  lg: "1.6rem",
                  xl: "1.7rem",
                },
              }}
              align={"center"}
            >
              This Offer Disappears after September 30
              <br />
              በአንድ ሸሚዝ ዋጋ፣ የኔን የአራት ዓመት እውቀት ያግኙ
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
