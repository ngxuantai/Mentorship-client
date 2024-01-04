import {useCallback, useEffect, useState} from 'react';
import {Container, Row} from 'react-bootstrap';
import {useLocation} from 'react-router';
import styled from 'styled-components';
import mentorApi from '../../api/mentor';
import skillApi from '../../api/skill';
import MentorItem from './components/MentorItem';
import SearchBar from './components/SearchBar';
import {useNavigate} from 'react-router-dom';
// import { CenteredRow, CenteredCol } from "@src/components/sharedComponents";
const StyledContainer = styled.div`
  width: 100%;
`;

const Text = styled.p`
  border-bottom: 1px solid gray;
`;

function Search() {
  const [searchResult, setSearchResult] = useState([]);
  const [skills, setSkills] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get('name');
  const skill = queryParams.get('skill');

  // const handleSearch = useCallback(async (searchInput, filters) => {
  const handleSearch = async (searchInput, filters) => {
    console.log('searchInput', searchInput);
    const mentors = await mentorApi.searchMentor(searchInput, filters);
    setSearchResult(mentors || []);
  };

  const resetSearch = async () => {
    const mentors = await mentorApi.searchMentor('', {});
    setSearchResult(mentors);
  };

  useEffect(() => {
    const fetchSkills = async () => {
      const allSkills = await skillApi.getAllSkills();
      setSkills(allSkills);
    };

    fetchSkills();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (skill) {
        await handleSearch('', {skill});
      } else if (name) {
        console.log('text', name);
        await handleSearch(name, {});
        // location.search = '';
      }
    };

    fetchData();
  }, [skill, name]);

  return (
    <>
      <StyledContainer>
        <Row>
          <h1
            style={{
              textAlign: 'center',
              width: '100%',
              captionSideolor: 'gray',
            }}
          >
            Tìm kiếm Mentor
          </h1>
          <SearchBar
            text={name}
            skill={skill}
            resetSearch={resetSearch}
            onSearch={handleSearch}
            // navigation={navigation}
          ></SearchBar>
          <div
            style={{
              width: '100%',
              height: 1,
              opacity: 0.5,
              marginBottom: 12,
              backgroundColor: 'gray',
            }}
          ></div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 12,
            }}
          >
            <div style={{width: '70%'}}>
              <h5>
                {searchResult.length === 0
                  ? 'Không tìm thấy mentor nào '
                  : `Tìm thấy ${searchResult.length} mentor`}
              </h5>
              {searchResult.map((mentor, index) => {
                const mentorSkills = skills.filter((skill) =>
                  mentor.skillIds.includes(skill.id)
                );
                console.log('skills', skills, mentorSkills);

                return (
                  <MentorItem
                    key={index}
                    mentor={{...mentor, skills: mentorSkills}}
                  />
                );
              })}
            </div>
          </div>
        </Row>
      </StyledContainer>
    </>
  );
}

export default Search;
