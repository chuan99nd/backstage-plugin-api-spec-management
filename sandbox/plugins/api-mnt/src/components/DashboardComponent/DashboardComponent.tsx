import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {  Header,  Page,  Content,  HeaderLabel, GitHubIcon, DocsIcon} from '@backstage/core-components';
import {
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  CircularProgress,
  Tooltip,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import axios from 'axios';

// Gradient header
const HeaderBox = styled(Header)({
  background: 'linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)',
  padding: '2rem',
  color: '#fff',
  borderRadius: '8px',
  marginBottom: '2rem',
  boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
});

interface Service {
  name: string;
  latestVersion: string;
  description: string;
}

const PAGE_SIZE = 10;

export const DashboardComponent = () => {

  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  // Fetch all services once
  useEffect(() => {
    const fetchAllServices = async () => {
      setLoading(true);
      try {
        // const res = await axios.get('/api/listService');
        // setServices(res.data.services);
        setServices([{name: 'User Service', latestVersion: 'v2.1.0', description: 'Handles user authentication and profiles.'},
        {name: 'Order Service', latestVersion: 'v3.0.5', description: 'Manages customer orders and transactions.'},
        {name: 'Inventory Service', latestVersion: 'v1.4.2', description: 'Tracks product stock and availability.'},
        {name: 'Payment Service', latestVersion: 'v2.3.1', description: 'Processes payments and refunds.'},
        {name: 'Notification Service', latestVersion: 'v1.2.0', description: 'Sends email and SMS notifications.'},
        {name: 'Analytics Service', latestVersion: 'v4.0.0', description: 'Provides data analytics and reporting.'},])
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllServices();
  }, []);

   // Filtered + paged data
   const filteredServices = useMemo(() => {
    return services.filter(s =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.description.toLowerCase().includes(query.toLowerCase())
    );
  }, [services, query]);

  const pagedServices = useMemo(() => {
    const start = page * PAGE_SIZE;
    return filteredServices.slice(start, start + PAGE_SIZE);
  }, [filteredServices, page, query]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPage(0); // reset page on search
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <Page themeId="apis">
        <Header title="Welcome to api spec centralize management!" 
          subtitle="Easily view, manage, and track all your API versions in one place">
            <HeaderLabel label="Owner" value="Platform team" />
            <HeaderLabel label="Lifecycle" value="Alpha" />
        </Header>
        <Content>
        <TextField
          label="Search services"
          variant="outlined"
          fullWidth
          value={query}
          onChange={handleSearchChange}
          sx={{ mb: 2 }}
        />

        {loading ? (
          <Box display="flex" justifyContent="center" mt={5}>
            <CircularProgress />
          </Box>
        ) : (
          <Paper>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Service Name</strong></TableCell>
                    <TableCell><strong>Latest Version</strong></TableCell>
                    <TableCell><strong>Description</strong></TableCell>
                    <TableCell><strong>Actions</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pagedServices.map((s) => (
                    <TableRow key={s.name}>
                      <TableCell>{s.name}</TableCell>
                      <TableCell>{s.latestVersion}</TableCell>
                      <TableCell>{s.description}</TableCell>
                      <TableCell>
                        <Tooltip title="Go to GitLab">
                          <IconButton
                            component="a"
                            onClick={() => {
                              navigate(`/apis/${s.name}`);
                            }}
                            sx={{ color: '#fc6d26' }}
                          >
                            <GitHubIcon />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="View API Spec">
                        <IconButton
                            component="a"
                            onClick={() => {
                              navigate(`/api-spec`);
                            }}
                            sx={{ color: '#fc6d26' }}
                          >
                            <DocsIcon />
                          </IconButton>
                        </Tooltip>
                    </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              component="div"
              count={filteredServices.length}      

              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={PAGE_SIZE}
              rowsPerPageOptions={[PAGE_SIZE]}
            />
          </Paper>
        )}
        </Content>
    </Page>
  );
}