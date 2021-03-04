import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import Box from 'reusecore/src/elements/Box';
import Image from 'reusecore/src/elements/Image';
import Fade from 'react-reveal/Fade';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import Text from 'reusecore/src/elements/Text';
import Heading from 'reusecore/src/elements/Heading';
import Container from 'common/src/components/UI/Container';
import BlockWrapper, {
  ContentWrapper,
  List,
  Item,
  ImageWrapper,
} from './humanityBlock.style';

const HumanityBlock = ({ row, col }) => {
  const data = useStaticQuery(graphql`
    query {
      charityJson {
        humanityData {
          image {
            publicURL
          }
          slogan
          title
          texto
          texto2
          txtboton
          lists {
            id
            text
          }
        }
      }
    }
  `);

  const {
    slogan,
    title,
    texto,
    texto2,
    txtboton,
    lists,
    image,
  } = data.charityJson.humanityData;

  const textoa = (texto) => {
    return { __html: texto };
  };

  const textob = (texto2) => {
    return { __html: texto2 };
  };

  return (
    <BlockWrapper id="inicio">
      <Container width="1260px">
        <Box className="row" {...row}>
          <Box className="col" {...col}>
            <ImageWrapper>
              <Fade left delay={30}>
                <Image src={image.publicURL} alt="Sobre nosotros KëbabNation" />
              </Fade>
            </ImageWrapper>
          </Box>
          <Box className="col" {...col}>
            <ContentWrapper>
              {/* <Heading as="h5" content={slogan} /> */}
              <Heading content={title} />
              <p dangerouslySetInnerHTML={textoa(texto)} />
              <p dangerouslySetInnerHTML={textob(texto2)} />
              <List>
                {lists.map((item) => (
                  <Item key={`list_key${item.id}`}>{item.text}</Item>
                ))}
              </List>

              <AnchorLink href="#panes" offset="81" className="learn__more-btn">
                <span className="hyphen" />
                <span className="btn_text">{txtboton}</span>
              </AnchorLink>
            </ContentWrapper>
          </Box>
        </Box>
      </Container>
    </BlockWrapper>
  );
};

// HumanityBlock style props
HumanityBlock.propTypes = {
  row: PropTypes.object,
  col: PropTypes.object,
};

// HumanityBlock default style
HumanityBlock.defaultProps = {
  // HumanityBlock row default style
  row: {
    flexBox: true,
    flexWrap: 'wrap',
    ml: '-15px',
    mr: '-15px',
  },
  // HumanityBlock col default style
  col: {
    width: ['100%', '50%', '50%'],
    pl: '15px',
    pr: '15px',
    mb: '30px',
  },
};

export default HumanityBlock;
