package com.proa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proa.model.OrgMilitar;

@Repository
public interface OrgMilitarRepository extends JpaRepository<OrgMilitar, Long>  {

}
