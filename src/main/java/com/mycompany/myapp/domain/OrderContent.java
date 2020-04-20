package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

/**
 * A OrderContent.
 */
@Entity
@Table(name = "order_content")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class OrderContent implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "i_dproduct", nullable = false)
    private Integer iDproduct;

    @NotNull
    @Column(name = "i_dorder", nullable = false)
    private Integer iDorder;

    @Column(name = "quantity_asked")
    private Integer quantityAsked;

    @Column(name = "product_available")
    private Boolean productAvailable;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @NotNull
    @JoinTable(name = "order_content_product",
               joinColumns = @JoinColumn(name = "order_content_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "product_id", referencedColumnName = "id"))
    private Set<Product> products = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "orderContents", allowSetters = true)
    private Order order;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getiDproduct() {
        return iDproduct;
    }

    public OrderContent iDproduct(Integer iDproduct) {
        this.iDproduct = iDproduct;
        return this;
    }

    public void setiDproduct(Integer iDproduct) {
        this.iDproduct = iDproduct;
    }

    public Integer getiDorder() {
        return iDorder;
    }

    public OrderContent iDorder(Integer iDorder) {
        this.iDorder = iDorder;
        return this;
    }

    public void setiDorder(Integer iDorder) {
        this.iDorder = iDorder;
    }

    public Integer getQuantityAsked() {
        return quantityAsked;
    }

    public OrderContent quantityAsked(Integer quantityAsked) {
        this.quantityAsked = quantityAsked;
        return this;
    }

    public void setQuantityAsked(Integer quantityAsked) {
        this.quantityAsked = quantityAsked;
    }

    public Boolean isProductAvailable() {
        return productAvailable;
    }

    public OrderContent productAvailable(Boolean productAvailable) {
        this.productAvailable = productAvailable;
        return this;
    }

    public void setProductAvailable(Boolean productAvailable) {
        this.productAvailable = productAvailable;
    }

    public Set<Product> getProducts() {
        return products;
    }

    public OrderContent products(Set<Product> products) {
        this.products = products;
        return this;
    }

    public OrderContent addProduct(Product product) {
        this.products.add(product);
        product.getOrdercontents().add(this);
        return this;
    }

    public OrderContent removeProduct(Product product) {
        this.products.remove(product);
        product.getOrdercontents().remove(this);
        return this;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
    }

    public Order getOrder() {
        return order;
    }

    public OrderContent order(Order order) {
        this.order = order;
        return this;
    }

    public void setOrder(Order order) {
        this.order = order;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof OrderContent)) {
            return false;
        }
        return id != null && id.equals(((OrderContent) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "OrderContent{" +
            "id=" + getId() +
            ", iDproduct=" + getiDproduct() +
            ", iDorder=" + getiDorder() +
            ", quantityAsked=" + getQuantityAsked() +
            ", productAvailable='" + isProductAvailable() + "'" +
            "}";
    }
}
