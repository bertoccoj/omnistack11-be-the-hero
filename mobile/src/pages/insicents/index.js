import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons'
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import api from '../../services/api';
import { formatCurrency } from '../../utils/utils';

import styles from './styles';

import logoImg from '../../assets/logo.png';

export default function Incidents() {
  const [incidents, setincidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  function navigateToDetail(incident) {
    navigation.navigate('Detail', { incident });
  }

  async function loadincidents() {
    if (loading) { return; }
    if (total > 0 && incidents.length === total) { console.log('oi'); return; }

    setLoading(true);

    setPage(page + 1);
    const { data, headers } = await api.get('/incidents', { params: { page } });
    setincidents(incidents.concat(data));
    setTotal(Number(headers['x-total-count']));

    setLoading(false);
  }

  useEffect(() => {
    loadincidents();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg}></Image>
        <Text>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
        </Text>
      </View>

      <Text style={styles.title}>Bem-Vindo!</Text>
      <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

      <FlatList
        style={styles.incidentList}
        data={incidents}
        keyExtractor={({ id }) => String(id)}
        // showsVerticalScrollIndicator={false}
        onEndReached={loadincidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf} </Text>

            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>

            <Text style={styles.incidentProperty}>Valor:</Text>
            <Text style={styles.incidentValue}>{formatCurrency(incident.value)}</Text>


            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navigateToDetail(incident)}>
                <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                <Feather name="arrow-right" size={16} color="#E02041"/>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
