import styled from 'styled-components';


const Page = styled.div`
background: white;
padding: 1rem 2rem;
margin: 1rem 0;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 400;
  border-bottom: 1px solid #efefef;
`;

const Item = styled.li`
  list-style-type: none;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #efefef;
  margin-bottom: 0.25rem;
`;

const UL = styled.ul`
  padding: 0;
`;

const Total = styled.p`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 1.5rem
`;

const Button = styled.button`
  /* background: transparent; */
  /* background-color: #7e6eee; */
  background: linear-gradient(to right, #fc00ff, #00dbde);
  color: inherit;
  outline: none;
  border: none;
  width: 100%;
  padding: 1rem;
  color: white;
  font-size: 2rem;
  /* font-size: 200%; */
  margin-bottom: 0.5rem;

  &:hover {
    cursor: pointer;
  }
`;



export { Page, Title, Item, UL, Total, Button };
