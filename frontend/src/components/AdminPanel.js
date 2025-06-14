import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

const AdminPanel = () => {
  const [empresas, setEmpresas] = useState({});
  const [nuevaEmpresa, setNuevaEmpresa] = useState({
    nombre: '',
    dominio: '',
    config: {
      empresaId: '',
      primaryColor: '#1976d2',
      secondaryColor: '#f5f5f5',
      width: '350px',
      height: '500px',
      position: 'bottom-right',
      welcomeMessage: '',
      buttonText: 'Chat',
      logo: '💬'
    }
  });

  useEffect(() => {
    cargarEmpresas();
  }, []);

  const cargarEmpresas = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/empresas');
      setEmpresas(response.data);
    } catch (error) {
      console.error('Error al cargar empresas:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/empresas', nuevaEmpresa);
      cargarEmpresas();
      setNuevaEmpresa({
        nombre: '',
        dominio: '',
        config: {
          empresaId: '',
          primaryColor: '#1976d2',
          secondaryColor: '#f5f5f5',
          width: '350px',
          height: '500px',
          position: 'bottom-right',
          welcomeMessage: '',
          buttonText: 'Chat',
          logo: '💬'
        }
      });
    } catch (error) {
      console.error('Error al crear empresa:', error);
    }
  };

  const eliminarEmpresa = async (empresaId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/empresas/${empresaId}`);
      cargarEmpresas();
    } catch (error) {
      console.error('Error al eliminar empresa:', error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Panel de Administración
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Empresas Registradas
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Dominio</TableCell>
                    <TableCell>ID</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(empresas).map(([id, empresa]) => (
                    <TableRow key={id}>
                      <TableCell>{empresa.nombre}</TableCell>
                      <TableCell>{empresa.dominio}</TableCell>
                      <TableCell>{empresa.config.empresaId}</TableCell>
                      <TableCell>
                        <Button 
                          variant="contained" 
                          color="error" 
                          size="small"
                          onClick={() => eliminarEmpresa(id)}
                        >
                          Eliminar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Agregar Nueva Empresa
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Nombre"
                    value={nuevaEmpresa.nombre}
                    onChange={(e) => setNuevaEmpresa({...nuevaEmpresa, nombre: e.target.value})}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Dominio"
                    value={nuevaEmpresa.dominio}
                    onChange={(e) => setNuevaEmpresa({...nuevaEmpresa, dominio: e.target.value})}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="ID de Empresa"
                    value={nuevaEmpresa.config.empresaId}
                    onChange={(e) => setNuevaEmpresa({
                      ...nuevaEmpresa,
                      config: {...nuevaEmpresa.config, empresaId: e.target.value}
                    })}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Mensaje de Bienvenida"
                    value={nuevaEmpresa.config.welcomeMessage}
                    onChange={(e) => setNuevaEmpresa({
                      ...nuevaEmpresa,
                      config: {...nuevaEmpresa.config, welcomeMessage: e.target.value}
                    })}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="color"
                    label="Color Principal"
                    value={nuevaEmpresa.config.primaryColor}
                    onChange={(e) => setNuevaEmpresa({
                      ...nuevaEmpresa,
                      config: {...nuevaEmpresa.config, primaryColor: e.target.value}
                    })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary"
                    fullWidth
                  >
                    Agregar Empresa
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminPanel; 