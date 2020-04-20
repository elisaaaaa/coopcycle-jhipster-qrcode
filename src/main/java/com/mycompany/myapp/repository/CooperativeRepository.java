package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Cooperative;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Cooperative entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CooperativeRepository extends JpaRepository<Cooperative, Long> {
}
