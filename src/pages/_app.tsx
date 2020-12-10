import { useState, useMemo } from 'react'
import { ThemeProvider, CSSReset } from '@chakra-ui/react';
import PageContex from '../context/'

import theme from '../styles/theme';

import { db } from '../../firebase'

import '../styles/googleAutocomplete.css'

function MyApp({ Component, pageProps }) {
  const [showModalConfirmation, setShowModalConfirmation] = useState({
    show: false, type: ""
  })
  const [showModalRecommendation, setShowModalRecommendation] = useState(false)
  const [showModalSharing, setShowModalSharing] = useState(false)
  const [registrationMsg, setRegistrationMsg] = useState({status: false, message: ""})
  const [googlePlacesScript, setGooglePlacesScript] = useState(false)
  const dbRef = useMemo(() => db.collection('registrations'),[])
  const sumaryRef = useMemo(() => db.collection("summary").doc("data"), [])
  const handleModalConfirmation = (type: string) => {
    return setShowModalConfirmation({
      show: !showModalConfirmation.show, type
    })
  }

  const handleModalRecommendation = () => {
    return setShowModalRecommendation(!showModalRecommendation)
  }

  const handleModalSharing = () => {
    return setShowModalSharing(!showModalSharing)
  }

  const findPhone = (phone: string, type: string) => {
    const query = dbRef
      .where('phone', '==', phone)
      .where('type', '==', type)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          return true;
        } else {
          return false
        }
      })
      .catch(err => {
        console.log('Error getting documents', err)
        return false;
      });
      return query
  }

  const findCity = (city: string) => {
    const query = dbRef.where('city', '==', city).get()
      .then(snapshot => {
        if (snapshot.empty) {
          return true;
        } else {
          return false
        }
      })
      .catch(err => {
        console.log('Error getting documents', err)
        return false;
      });
      return query
  }

  const handleRegistration = async (
    type: string, 
    phone: string, 
    city: string, 
    indicated_by: string
    ) => {
    setRegistrationMsg({status: false, message: ""})
    try {
      const isNewPhone = await findPhone(phone, type)
      if(!isNewPhone) {
        setRegistrationMsg({
          status: true, 
          message: "O celular informado já foi cadastrado para o perfil selecionado. Você pode tentar com outro perfil."
        })
        return false
      }
      const batch = db.batch()
      const isNewCity = await findCity(city)
      const oldSummary = (await sumaryRef.get()).data()
      const newCitiesValue = isNewCity ? oldSummary.cities + 1 : oldSummary.cities
      const newSummary = {
        ...oldSummary,
        cities: newCitiesValue, 
        [`${type}`]: oldSummary[`${type}`] + 1
      }
      const newDoc = {
        type,
        phone, 
        city,
        indicated_by
      }
      batch.set(dbRef.doc(), newDoc);
      batch.update(sumaryRef, newSummary)
      batch.commit()
      return true
    } catch (error) {
      setRegistrationMsg({
        status: true, 
        message: 
          "Desculpe. Não foi possível acessar o servidor. Tente novamente em alguns instantes."
      })
      return false
    }
  }

  return (
    <PageContex.Provider value={{
      showModalConfirmation,
      showModalRecommendation,
      showModalSharing,
      registrationMsg,
      googlePlacesScript, 
      setGooglePlacesScript,
      setRegistrationMsg,
      handleModalConfirmation,
      handleModalRecommendation,
      handleModalSharing,
      handleRegistration
    }}>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Component {...pageProps} />
      </ThemeProvider>
    </PageContex.Provider>
  )
}

export default MyApp
