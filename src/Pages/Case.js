import {
  Box,
  Text,
  Container,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalCloseButton,
  Checkbox,
  Button,
} from '@chakra-ui/react';
import CustomTablePaginate from '../Components/CustomTablePaginate';
import { useNavigate } from 'react-router-dom';
import useAuth from '../Hooks/AuthContext';
import { useEffect, useState } from 'react';
import { GetRequest } from '../API/api';
import { Case } from '../API/Paths';

const CaseConsent = props => {
  return (
    <Modal size={'full'} isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{'Informed Consent'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box mt={5}>
            <Text fontWeight={'bold'}>Introduction and Purpose:</Text>
            <Text>
              The ZCMC Regional Telemedicine Center has been established to
              provide sound medical advice to other healthcare providers through
              various telecommunication systems available. This may involve live
              two-way audio and video, patient pictures, medical images,
              patient’s medical records and other things that may be pertinent
              to the process of telemedicine. It does not have direct physical
              contact with the parties involved and relies solely on the
              information being given by the referring hospital. Electronic
              systems will utilize network and software security protocols to
              protect patient identity, privacy and confidentiality and to
              safeguard data and prevent corruption of data against intentional
              or unintentional corruption.
            </Text>
          </Box>
          <Box mt={5}>
            <Text fontWeight={'bold'}>Nature of the teleconsultation:</Text>
            <Text>
              It was explained to me by my attending physician that an SMS,
              phone call, online chat or video conferencing technology will be
              used to conduct the telemedicine consultation. I understand that
              as in the face-to-face consultation, my medical history along with
              my laboratory test/s, imaging results and other documents
              pertinent to my concerns will be shared by my attending physician
              to the ZCMC telemedicine specialists. Moreover, I may be asked to
              show certain body parts as may be considered important to form a
              diagnosis. This is in view of the fact that the specialist we will
              be referring to will not be in the same hospital as I am and would
              not be able to perform the necessary physical examination on me.
            </Text>
          </Box>
          <Box mt={5}>
            <Text fontWeight={'bold'}>Benefits:</Text>
            <Text>
              Through the use of teleconsultation, my attending physicians will
              be able to concur with certain specialists who will in turn aid
              them in obtaining a medical evaluation and impression of my
              condition. I may receive guidance on monitoring my condition and
              the next steps to do should my condition change, specific
              prescription on what to take, instructions on what laboratory and
              imaging tests to do.
            </Text>
          </Box>
          <Box mt={5}>
            <Text fontWeight={'bold'}>Potential Risks:</Text>
            <Text>
              I understand there are potential risks in using this technology,
              including technical difficulties, interruptions, poor transmission
              of images leading to misdiagnosis and consequently mistreatment,
              no access to paper charts/medical records, delays and deficiencies
              due to malfunction of electronic equipment and software,
              unauthorized access leading to breach of data privacy and
              confidentiality. All consultations are considered confidential but
              given the nature of technology, I understand that despite using
              appropriate measures, the ZCMC Telemedicine Regional Center OPD
              and other related units cannot guarantee the safety of my personal
              data from data hacking. Therefore, I cannot hold them liable for
              any data that may be lost, corrupted, destroyed or intercepted or
              the illegal use of my data arising from a breach in security.
            </Text>
          </Box>
          <Box mt={5}>
            <Text fontWeight={'bold'}>Data Privacy and Confidentiality:</Text>
            <Text>
              I agree to share my personal data in order to facilitate
              scheduling of my consultation and to be utilized for research
              purposes. I agree not to record in video or audio format nor
              divulge the details of my consultation in compliance with the Data
              Privacy Act of 2012.
            </Text>
          </Box>
          <Box mt={5}>
            <Text fontWeight={'bold'}>Rights:</Text>
            <Text>
              I have the right to: 1. Terminate the telemedicine
              teleconsultation at any time. 2. Be accompanied and assisted by a
              family member or caregiver during the teleconsultation.
            </Text>
          </Box>
          <Box mt={5}>
            <Text fontWeight={'bold'}>Limitations:</Text>
            <Text>
              The strength of network signal, the speed of the
              internet,audibility of the sound, the presence of background
              noise, clarity of the images, all affect the quality of the
              telemedicine consultation. Physical examination as done in the
              usual face-to-face consultation is not possible and is therefore a
              big limitation to the process of making a diagnosis.
            </Text>
          </Box>
          <Box mt={5}>
            <Text fontWeight={'bold'}>In case of an urgent concern:</Text>
            <Text>
              It is my doctor’s responsibility to refer me to the nearest
              Emergency Room or hospital of my choice in case he/she deems my
              concern to be urgent and would warrant immediate action and
              management. I acknowledge that prior to engaging in such
              consultation platform, I have been made fully aware of its
              purpose, scopes and limitations. I further acknowledge that
              consent was given to share my medical history, records and
              laboratory results for the purpose of discussion, in accordance
              with the RA 10173 Data Privacy Act. I further acknowledge that I
              am aware this virtual encounter will be recorded and all details
              be kept confidential between my attending physician and the ZCMC
              Telemedicine healthcare personnel involved. I further acknowledge
              given that this is only a virtual consult, the ZCMC Regional
              Telemedicine Center along with its doctors shall not be held
              directly liable for my care or for any other untoward events that
              may occur in between, thus freeing them from any legal
              responsibilities in the future. I fully understand the nature,
              processes, risks and benefits of teleconsultation as they were
              shared in a language that I can understand. I was given the
              opportunity to ask questions and my questions were answered.
            </Text>
          </Box>
          <Checkbox
            onChange={e => props.setDissable(!props.dissable)}
          ></Checkbox>
        </ModalBody>
        <ModalFooter>
          <Button
            bg={'lightwhite'}
            color="black"
            mr={3}
            onClick={props.onClose}
          >
            Cancel
          </Button>
          <Button
            bg={'green.500'}
            color={'white'}
            _hover={{ bg: 'green.600' }}
            onClick={() => props.redirect()}
          >
            Yes, I Accept.
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const Cases = () => {
  const navigate = useNavigate();
  const [cases, setCases] = useState([]);
  const [dissable, setDissable] = useState(true);
  const [fetch, setFetch] = useState(true);
  const { search, setSearch } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [msg, setMsg] = useState('');

  const Title = 'Case';

  const redirect = () => {
    navigate('/case/form');
  };

  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Case #',
      accessor: 'case_number',
    },
    {
      Header: 'PATIENTS',
      accessor: 'patient',
    },
    {
      Header: 'Hospital',
      accessor: 'hospital_Name',
    },
    {
      Header: 'GENDER',
      accessor: 'sex',
    },
    {
      Header: 'SERVICE',
      accessor: 'specialization',
    },
    {
      Header: 'STATUS',
      accessor: 'case_status',
    },
    {
      Header: 'ACTION',
      accessor: 'action',
    },
  ];

  const handleFetch = () => {
    GetRequest({ url: Case })
      .then(res => res.data)
      .then(res => {
        if (!res.statusText === 'OK') {
          throw new Error('Bad response.', { cause: res });
        }

        const { data } = res;

        if (JSON.parse(localStorage.getItem('cases')) !== null) {
          const items = JSON.parse(localStorage.getItem('cases'));
          const newData = data;

          if (items.length === newData.length) {
            return;
          }
        }

        localStorage.setItem('cases', JSON.stringify(data));
        setCases(data);
      })
      .catch(err => {
        switch (err) {
          case 400:
            setMsg("Process can't complete. try again later.");
            break;
          case 401:
            setMsg('Un-Authorized.');
            break;
          case 404:
            setMsg('No record found.');
            break;
          default:
            setMsg("Can't process right now. try again later.");
            break;
        }
      });
  };

  const filtered = cases.filter(filter =>
    filter.case_status === 2
      ? null
      : filter.case_number
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase()) ||
        filter.patient
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase()) ||
        filter.specialization
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase()) ||
        filter.sex.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
        filter.hospital_Name
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase())
  );

  useEffect(() => {
    if (fetch && JSON.parse(localStorage.getItem('cases'))) {
      setCases(JSON.parse(localStorage.getItem('cases')));
    }

    const intervalId = setInterval(
      () => {
        if (fetch) {
          setFetch(false);
        }
        handleFetch();
      },
      fetch ? 0 : 30000
    );

    return () => clearInterval(intervalId);
  }, [fetch]);

  return (
    <>
      <Container maxW={'container.xxl'}>
        <Box mt={[5, 5, 8, 5]} p={[0, 0, 3, 5]}>
          <CustomTablePaginate
            title={Title}
            columns={columns}
            data={filtered}
            fetch={setFetch}
            search={search}
            onOpen={onOpen}
            setSearch={setSearch}
            isModal={true}
          />
        </Box>
        <CaseConsent
          isOpen={isOpen}
          onClose={onClose}
          dissable={dissable}
          setDissable={setDissable}
          redirect={redirect}
        />
      </Container>
    </>
  );
};

export default Cases;
