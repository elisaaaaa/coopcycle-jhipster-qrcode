package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.OrderContent;
import com.mycompany.myapp.repository.OrderContentRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.OrderContent}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class OrderContentResource {

    private final Logger log = LoggerFactory.getLogger(OrderContentResource.class);

    private static final String ENTITY_NAME = "orderContent";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OrderContentRepository orderContentRepository;

    public OrderContentResource(OrderContentRepository orderContentRepository) {
        this.orderContentRepository = orderContentRepository;
    }

    /**
     * {@code POST  /order-contents} : Create a new orderContent.
     *
     * @param orderContent the orderContent to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new orderContent, or with status {@code 400 (Bad Request)} if the orderContent has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/order-contents")
    public ResponseEntity<OrderContent> createOrderContent(@Valid @RequestBody OrderContent orderContent) throws URISyntaxException {
        log.debug("REST request to save OrderContent : {}", orderContent);
        if (orderContent.getId() != null) {
            throw new BadRequestAlertException("A new orderContent cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OrderContent result = orderContentRepository.save(orderContent);
        return ResponseEntity.created(new URI("/api/order-contents/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /order-contents} : Updates an existing orderContent.
     *
     * @param orderContent the orderContent to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated orderContent,
     * or with status {@code 400 (Bad Request)} if the orderContent is not valid,
     * or with status {@code 500 (Internal Server Error)} if the orderContent couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/order-contents")
    public ResponseEntity<OrderContent> updateOrderContent(@Valid @RequestBody OrderContent orderContent) throws URISyntaxException {
        log.debug("REST request to update OrderContent : {}", orderContent);
        if (orderContent.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        OrderContent result = orderContentRepository.save(orderContent);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, orderContent.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /order-contents} : get all the orderContents.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of orderContents in body.
     */
    @GetMapping("/order-contents")
    public List<OrderContent> getAllOrderContents(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all OrderContents");
        return orderContentRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /order-contents/:id} : get the "id" orderContent.
     *
     * @param id the id of the orderContent to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the orderContent, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/order-contents/{id}")
    public ResponseEntity<OrderContent> getOrderContent(@PathVariable Long id) {
        log.debug("REST request to get OrderContent : {}", id);
        Optional<OrderContent> orderContent = orderContentRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(orderContent);
    }

    /**
     * {@code DELETE  /order-contents/:id} : delete the "id" orderContent.
     *
     * @param id the id of the orderContent to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/order-contents/{id}")
    public ResponseEntity<Void> deleteOrderContent(@PathVariable Long id) {
        log.debug("REST request to delete OrderContent : {}", id);

        orderContentRepository.deleteById(id);
    return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
