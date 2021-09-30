import { Box } from "@chakra-ui/react";
import Head from 'next/head';
import Container from "../Container";
import Footer from "../Footer";
import React from 'react';
import Seo from "../Seo";
import { RestaurantAppsBox } from "./RestaurantAppsBox";
import { Mode, OrderButton } from "./OrderButton";
import { useRouter } from "next/router";

interface MenuPageLayoutProps {
  businessName?:  string;
  businessDescription?:  string;
  businessPhone?:  string;
  isAbout: boolean;
  children: React.ReactNode | React.ReactNode[];
}

export default function MenuPageLayout({
  businessName, businessDescription, businessPhone, isAbout, children
}: MenuPageLayoutProps) {
  // router
  const { query } = useRouter();
  // state
  const [whatsLimit, setWhatsLimit] = React.useState(false);
  // refs
  const BoxRef = React.useRef<HTMLDivElement>(null);
  // side effects
  React.useEffect(() => {
    if(!BoxRef.current) return;
    const limit = BoxRef.current.scrollHeight - 206 - screen.height;
    const handleScroll = () => {
      if(isAbout) return;
      if (document.documentElement.scrollTop >= limit) setWhatsLimit(true);
      else setWhatsLimit(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [BoxRef?.current, isAbout]);
  React.useEffect(() => {
    if(isAbout) setWhatsLimit(true);
    else setWhatsLimit(false);
  }, [isAbout]);
  // UI
  return (
    <Box ref={BoxRef}>
      <Head>
        <title>AppJusto | {businessName ?? 'Restaurante'}</title>
        <Seo
          metaDescription={businessDescription ?? "Mais do que um app de entregas. Um movimento por relações mais justas e transparentes para restaurantes, entregadores e clientes. Faça parte desse movimento!"}
          title={`AppJusto | ${businessName ?? 'Restaurante'}`}
          author="@appjusto"
          canonical_url="https://appjusto.com.br/"
        />
      </Head>
      <Box>
        <RestaurantAppsBox />
        <Container position="relative" w="100vw" pb="24">
          <Box position="relative" mt={{base: '2', lg: '0'}} maxW={{base: '100%', lg: '656px'}} zIndex="999">
            {children}
            <OrderButton mode={query.mode as Mode} limit={whatsLimit} phone={businessPhone} />
          </Box>
        </Container>
        <Footer />
      </Box>
    </Box>
  );
};
