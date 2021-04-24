import fs from 'fs';
import matter from 'gray-matter';
import marked from 'marked';
import styled from 'styled-components';
import { Page } from '../../components/styled/Page';


// const Container = styled.div`
//   background: white;
//   padding: 1rem 2rem;
//   margin: 1rem 0;
// `;

const Title = styled.div`
  display: flex;
  align-items: flex-end;
  /* justify-content: flex-end; */
`;

const SubTitle = styled.p`
  padding: 0.75rem 0.5rem;
  color: #666;
`;

const Price = styled.span`
  font-size: 2rem;
  /* background: yellow; */
  background: #0dd0e0;
  padding: 0.25rem 1rem;
  border-radius: 5px;
  color: white;
  font-weight: 800;
  display: inline-block;  // need to change span to inline-block, so that we can add the margin-bottom below
  margin-bottom: 1rem;
`;


const ProductDetailsPage = ({ product: { data, content } }) => {
  // console.log(product)
  // const { data, content } = product;
  const html = marked(content);
  return (
    <Page>
      <Title>
        <h1>{data.name}</h1>
        <SubTitle>{data.description}</SubTitle>
      </Title>
      <Price>${data.price / 100}</Price>
      {/* <p>{content}</p> */}
      <div dangerouslySetInnerHTML={ {__html: html }} />
    </Page>
  )
};


export const getStaticPaths = async() => {
  // product pages to generate
  const directory = `${process.cwd()}/content`;
  const filenames = fs.readdirSync(directory);

  const paths = filenames.map(filename => {
    return {
      params: {
        product: filename.replace('.md', '')
      }
    }
  });

  return {
    paths,
    fallback: false   // uses default 404 page
  };
};


export const getStaticProps = async(context) => {
  const productName = context.params.product;
  const filePath = `${process.cwd()}/content/${productName}.md`;
  const fileContent = fs.readFileSync(filePath).toString();

  const { data, content } = matter(fileContent);

  return {
    props: {
      product: {
        data,
        content
      }
    }
  }
};

export default ProductDetailsPage
