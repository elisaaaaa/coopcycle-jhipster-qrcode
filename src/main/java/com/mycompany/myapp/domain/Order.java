package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

import com.mycompany.myapp.domain.enumeration.State;

/**
 * A Order.
 */
@Entity
@Table(name = "jhi_order")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Order implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "i_dorder", nullable = false)
    private Integer iDorder;

    @NotNull
    @Column(name = "i_dcooperative", nullable = false)
    private Integer iDcooperative;

    @NotNull
    @Column(name = "i_dcustomer", nullable = false)
    private Integer iDcustomer;

    @NotNull
    @Column(name = "i_dcourse", nullable = false)
    private Integer iDcourse;

    @Min(value = 3)
    @Max(value = 300)
    @Column(name = "total_price")
    private Integer totalPrice;

    @Column(name = "date")
    private ZonedDateTime date;

    @Enumerated(EnumType.STRING)
    @Column(name = "state")
    private State state;

    @OneToMany(mappedBy = "order")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<OrderContent> orderContents = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "orders", allowSetters = true)
    private Course course;

    @ManyToOne
    @JsonIgnoreProperties(value = "orders", allowSetters = true)
    private Customer customer;

    @ManyToOne
    @JsonIgnoreProperties(value = "orders", allowSetters = true)
    private Cooperative cooperative;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getiDorder() {
        return iDorder;
    }

    public Order iDorder(Integer iDorder) {
        this.iDorder = iDorder;
        return this;
    }

    public void setiDorder(Integer iDorder) {
        this.iDorder = iDorder;
    }

    public Integer getiDcooperative() {
        return iDcooperative;
    }

    public Order iDcooperative(Integer iDcooperative) {
        this.iDcooperative = iDcooperative;
        return this;
    }

    public void setiDcooperative(Integer iDcooperative) {
        this.iDcooperative = iDcooperative;
    }

    public Integer getiDcustomer() {
        return iDcustomer;
    }

    public Order iDcustomer(Integer iDcustomer) {
        this.iDcustomer = iDcustomer;
        return this;
    }

    public void setiDcustomer(Integer iDcustomer) {
        this.iDcustomer = iDcustomer;
    }

    public Integer getiDcourse() {
        return iDcourse;
    }

    public Order iDcourse(Integer iDcourse) {
        this.iDcourse = iDcourse;
        return this;
    }

    public void setiDcourse(Integer iDcourse) {
        this.iDcourse = iDcourse;
    }

    public Integer getTotalPrice() {
        return totalPrice;
    }

    public Order totalPrice(Integer totalPrice) {
        this.totalPrice = totalPrice;
        return this;
    }

    public void setTotalPrice(Integer totalPrice) {
        this.totalPrice = totalPrice;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public Order date(ZonedDateTime date) {
        this.date = date;
        return this;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public State getState() {
        return state;
    }

    public Order state(State state) {
        this.state = state;
        return this;
    }

    public void setState(State state) {
        this.state = state;
    }

    public Set<OrderContent> getOrderContents() {
        return orderContents;
    }

    public Order orderContents(Set<OrderContent> orderContents) {
        this.orderContents = orderContents;
        return this;
    }

    public Order addOrderContent(OrderContent orderContent) {
        this.orderContents.add(orderContent);
        orderContent.setOrder(this);
        return this;
    }

    public Order removeOrderContent(OrderContent orderContent) {
        this.orderContents.remove(orderContent);
        orderContent.setOrder(null);
        return this;
    }

    public void setOrderContents(Set<OrderContent> orderContents) {
        this.orderContents = orderContents;
    }

    public Course getCourse() {
        return course;
    }

    public Order course(Course course) {
        this.course = course;
        return this;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Customer getCustomer() {
        return customer;
    }

    public Order customer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Cooperative getCooperative() {
        return cooperative;
    }

    public Order cooperative(Cooperative cooperative) {
        this.cooperative = cooperative;
        return this;
    }

    public void setCooperative(Cooperative cooperative) {
        this.cooperative = cooperative;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Order)) {
            return false;
        }
        return id != null && id.equals(((Order) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Order{" +
            "id=" + getId() +
            ", iDorder=" + getiDorder() +
            ", iDcooperative=" + getiDcooperative() +
            ", iDcustomer=" + getiDcustomer() +
            ", iDcourse=" + getiDcourse() +
            ", totalPrice=" + getTotalPrice() +
            ", date='" + getDate() + "'" +
            ", state='" + getState() + "'" +
            "}";
    }
}
