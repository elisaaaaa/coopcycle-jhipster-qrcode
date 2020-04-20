package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.OrderContent;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the OrderContent entity.
 */
@Repository
public interface OrderContentRepository extends JpaRepository<OrderContent, Long> {

    @Query(value = "select distinct orderContent from OrderContent orderContent left join fetch orderContent.products",
        countQuery = "select count(distinct orderContent) from OrderContent orderContent")
    Page<OrderContent> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct orderContent from OrderContent orderContent left join fetch orderContent.products")
    List<OrderContent> findAllWithEagerRelationships();

    @Query("select orderContent from OrderContent orderContent left join fetch orderContent.products where orderContent.id =:id")
    Optional<OrderContent> findOneWithEagerRelationships(@Param("id") Long id);
}
