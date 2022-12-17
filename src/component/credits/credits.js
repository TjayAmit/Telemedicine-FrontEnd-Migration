import {
  Grid,
  GridItem,
  Box,
  Text,
  Heading,
  Center,
  Image,
  IconButton,
} from '@chakra-ui/react';
import { FaFacebookF, FaGithub } from 'react-icons/fa';
import { BsLinkedin } from 'react-icons/bs';

const CreditsJSON = [
  {
    index: 0,
    name: 'Arzl James I. Lao',
    skills: 'Tech Lead | Full-Stack Developer',
    url: 'https://zcmc.vercel.app/static/media/lao.5eb13dfbcc556ccef76d.jpg',
    facebook: 'https://www.facebook.com/arzl.james',
    linkedIn: 'https://www.linkedin.com/in/arzljames/',
    github: 'https://github.com/arzljames',
    isRow: false,
  },
  {
    index: 1,
    name: 'Reenjay Caimor',
    skills: 'Full-Stack Developer | Web Designer',
    url: 'https://www.facebook.com/photo/?fbid=4824826454312850&set=a.133186776810198',
    facebook: 'https://www.facebook.com/reenjay.caimor',
    linkedIn: 'https://www.linkedin.com/in/reenjay-caimor-b207b9245/',
    github: 'https://github.com/reenjie',
    isRow: true,
  },
  {
    index: 2,
    name: 'Tristan Jay L. Amit',
    skills: 'Full-Stack Developer | Analyst',
    url: 'https://media.licdn.com/dms/image/C5603AQFRlv3ZbjpTJg/profile-displayphoto-shrink_800_800/0/1662975803884?e=1676505600&v=beta&t=kSsoZOGf6HHoEdo1opDwoYZoSV3n8XX5X9NyFjfV9XU',
    facebook: 'https://www.facebook.com/profile.php?id=100077820308629',
    linkedIn: 'https://www.linkedin.com/in/tristan-jay-amit-9a3ba51b8/',
    github: 'https://github.com/TjayAmit',
    isRow: false,
  },
  {
    index: 4,
    name: 'Rina Militante',
    skills: 'Project Manager | Archivist',
    url: 'https://media.istockphoto.com/id/1327592664/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-woman.jpg?s=612x612&w=0&k=20&c=6SzxAmNr9PZtHIeVZa0l6RbcRpjTnyeno0fW9B5Y6Uk=',
    facebook: 'https://www.facebook.com/',
    linkedIn: 'https://www.linkedin.com/',
    github: 'https://github.com',
    isRow: false,
  },
  {
    index: 5,
    name: 'Dennis N. Falcasantos',
    skills: 'Full-Stack Developer',
    url: 'https://media.licdn.com/dms/image/C5603AQHyuMdagd4_MQ/profile-displayphoto-shrink_800_800/0/1654955653714?e=1676505600&v=beta&t=916Yz3pkfAFw5FCT-8ETG8qpUOzvhrwC9-ws7DUd7-o',
    facebook: 'https://www.facebook.com/Davidson848',
    linkedIn: 'https://www.linkedin.com/in/dennis-falcasantos-233315230/',
    github: 'https://github.com/aseyte2',
    isRow: false,
  },
  {
    index: 6,
    name: 'Kim Horace Dollar',
    skills: 'Web Developer',
    url: 'https://media.licdn.com/dms/image/C5603AQFTY4NJ5YtC4g/profile-displayphoto-shrink_800_800/0/1597425604662?e=1676505600&v=beta&t=76tngUIHfmxnu37-EkO-WJIRUfS_0mC0Wch4hYj1za0',
    facebook: 'https://www.facebook.com/kimdeee',
    linkedIn: 'https://www.linkedin.com/in/kim-horace-dolar-302984183/',
    github: 'https://github.com/kimdee',
    isRow: false,
  },
];

const ProfileBox = data => {
  const dev = data.data;

  return (
    <Box
      marginBottom={40}
      w={300}
      h={480}
      rounded={6}
      _hover={{
        boxShadow: 'dark-lg',
      }}
    >
      <Box p={'10px'}>
        <Box>
          <Image src={dev.url} w={360} h={300} rounded={6} />
        </Box>
        <Box mt={4}>
          <Heading size={'md'}>{dev.name}</Heading>
          <Text marginTop={2} size={30} color={'grey'}>
            {dev.skills}
          </Text>
          <Box marginTop={2}>
            <a href={dev.facebook} rel="noreferrer" target={'_blank'}>
              <IconButton
                mr={2}
                color={'grey'}
                _hover={{
                  color: 'white',
                  bg: '#007aff',
                }}
                icon={<FaFacebookF />}
              />
            </a>
            <a href={dev.linkedIn} rel="noreferrer" target={'_blank'}>
              <IconButton
                mr={2}
                color={'grey'}
                _hover={{
                  color: 'white',
                  bg: '#0a66c2',
                }}
                icon={<BsLinkedin />}
              />
            </a>
            <a href={dev.github} rel="noreferrer" target={'_blank'}>
              <IconButton
                mr={2}
                color={'grey'}
                _hover={{
                  color: 'white',
                  bg: '#bb86fc',
                }}
                icon={<FaGithub />}
              />
            </a>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const CustomGridItem = data => {
  const dev = data.data;
  if (dev.isRow) {
    return (
      <GridItem rowSpan={1} colSpan={[4, 2, 1]}>
        <ProfileBox data={dev} />;
      </GridItem>
    );
  }

  return (
    <GridItem colSpan={[4, 2, 1]}>
      <ProfileBox data={dev} />
    </GridItem>
  );
};

const Credits = () => {
  return (
    <>
      <Box p={8} w={'100%'}>
        <Center mt={10}>
          <Box
            w={'100%'}
            h={'100px'}
            textAlign={'center'}
            display="flex"
            flexDirection={'column'}
            justifyContent={'space-between'}
          >
            <Heading color={'#65806e'} fontSize={'45px'} fontWeight={'900'}>
              Meet our Dev Team
            </Heading>
            <Text color={'#75b687'} fontSize={'23px'}>
              We Are, Therefore we Develop
            </Text>
          </Box>
        </Center>
        <Center>
          <Grid
            mt={[70, 60, 50, 35]}
            templateRows={`repeat(2, 1fr)`}
            templateColumns={`repeat(4, 1fr)`}
            gap={20}
            overflow={'hidden'}
            p={30}
          >
            {CreditsJSON.map(data => {
              return <CustomGridItem data={data} key={data.index} />;
            })}
          </Grid>
        </Center>
      </Box>
    </>
  );
};

export default Credits;
