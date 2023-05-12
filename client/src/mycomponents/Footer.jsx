import styled from "styled-components"

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: whitesmoke;
  box-shadow: 1px 2px 2px lightgray;
  width: 100%;

`

const Text = styled.h4`
  color: #c6a856;
  font-weight: 500;
`
const CopyRight = styled.p`
  color:#c6a856;
`
const Footer = () => {
  return (
    <Container>
      <Text>Application is for demo purpose only.</Text>
      <CopyRight>&copy;2023 All rights reserverd</CopyRight>
    </Container>
  )
}

export default Footer
