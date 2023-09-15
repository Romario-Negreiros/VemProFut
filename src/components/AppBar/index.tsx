"use client";

import { useState, useContext } from "react";

import MUIAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";

import userContext from "@/contexts/userContext";

import type { FC } from "react";

const items = ["clubes", "campeonatos", "acompanhar", "registrar", "entrar", "sair"];

const AppBar: FC = () => {
  const { user, setUser } = useContext(userContext);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const logOut = () => {
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    setUser(null);
  };

  return (
    <MUIAppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component="a"
            href="/"
            sx={{
              display: { xs: "none", md: "flex" },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            VEMPROFUT
          </Typography>
          <Typography
            variant="h5"
            component="a"
            href="/"
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {items.map((item) => {
                if (item === "sair" && !user) return null;
                else if ((item === "entrar" || item === "registrar") && user) return null;
                else
                  return (
                    <MenuItem
                      key={item}
                      onClick={() => {
                        handleCloseNavMenu();
                        if (item === "sair") logOut();
                      }}
                    >
                      <Link
                        href={`/${item === "sair" ? "" : item}`}
                        style={{ color: "inherit", textDecoration: "none" }}
                      >
                        <Typography textAlign="center">{item.toUpperCase()}</Typography>
                      </Link>
                    </MenuItem>
                  );
              })}
              {user && (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link href={`/usuarios/${user.name}`} style={{ color: "inherit", textDecoration: "none" }}>
                    <Typography textAlign="center">{user.name}</Typography>
                  </Link>
                </MenuItem>
              )}
            </Menu>
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {items.map((item) => {
              if (item === "sair" && !user) return null;
              else if ((item === "entrar" || item === "registrar") && user) return null;
              else
                return (
                  <Button
                    key={item}
                    sx={{ color: "white" }}
                    onClick={() => {
                      if (item === "sair") logOut();
                    }}
                  >
                    <Link href={`/${item === "sair" ? "" : item}`} style={{ color: "inherit", textDecoration: "none" }}>
                      {item.toUpperCase()}
                    </Link>
                  </Button>
                );
            })}
            {user && (
              <Button sx={{ color: "white" }}>
                <Link href={`/usuarios/${user.name}`} style={{ color: "inherit", textDecoration: "none" }}>
                  {user.name.toUpperCase()}
                </Link>
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </MUIAppBar>
  );
};
export default AppBar;
